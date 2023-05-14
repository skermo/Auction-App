package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.entity.*;
import com.internship.auctionapp.exception.BadRequestException;
import com.internship.auctionapp.exception.ConflictException;
import com.internship.auctionapp.exception.NotFoundException;
import com.internship.auctionapp.repository.*;
import com.internship.auctionapp.request.PaymentRequest;
import com.internship.auctionapp.response.PaymentResponse;
import com.internship.auctionapp.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.Token;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentServiceImpl implements PaymentService {
    private static final Logger LOGGER = LoggerFactory.getLogger(PaymentServiceImpl.class);
    private final String STRIPE_KEY = System.getenv("stripe_secret_key");
    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    private final ItemRepository itemRepository;
    private final ShipmentRepository shipmentRepository;
    private final BidRepository bidRepository;

    public PaymentServiceImpl(UserRepository userRepository, CardRepository cardRepository, ItemRepository itemRepository, ShipmentRepository shipmentRepository, BidRepository bidRepository) {
        this.userRepository = userRepository;
        this.cardRepository = cardRepository;
        this.itemRepository = itemRepository;
        this.shipmentRepository = shipmentRepository;
        this.bidRepository = bidRepository;
    }

    @PostConstruct
    public void init() {
        Stripe.apiKey = STRIPE_KEY;
    }

    @Override
    public PaymentResponse pay(PaymentRequest paymentRequest) {
        checkPaymentRequestValidity(paymentRequest);

        User user = userRepository.findById(paymentRequest.getUserId()).get();
        if (user.getStripeUserId() == null) {
            user.setStripeUserId(createStripeUser(user));
            userRepository.save(user);
        }
        updateUserAddress(user, paymentRequest);

        Customer customer;
        try {
            customer = Customer.retrieve(user.getStripeUserId());
        } catch (StripeException e) {
            throw new ConflictException("Unable to retrieve customer " + user.getId());
        }

        String stripeCardId = checkIfCardExists(paymentRequest, user);

        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", (int) paymentRequest.getAmount() * 100);
        chargeParams.put("currency", "usd");
        chargeParams.put("customer", customer.getId());
        chargeParams.put("source", stripeCardId);
        try {
            Charge.create(chargeParams);
            createShipment(paymentRequest, user);
            return new PaymentResponse(paymentRequest.getAmount(), user.getId(), paymentRequest.getItemId());
        } catch (StripeException e) {
            LOGGER.error("Unable to charge user " + paymentRequest.getUserId());
            throw new BadRequestException("Unable to charge user.");
        }
    }

    private void updateUserAddress(User user, PaymentRequest paymentRequest) {
        user.setAddress(paymentRequest.getAddress());
        user.setCity(paymentRequest.getCity());
        user.setZip(paymentRequest.getZip());
        user.setCountry(paymentRequest.getCountry());
        try {
            userRepository.save(user);
            LOGGER.info("User address updated!");
        } catch (RuntimeException e) {
            LOGGER.error("Unable to update address of user " + user.getId());
            throw new ConflictException("Unable to update user address");
        }

    }

    private String createStripeUser(User user) {
        Map<String, Object> userParams = new HashMap<>();
        userParams.put("name", user.getFirstName() + " " + user.getLastName());
        userParams.put("email", user.getEmail());
        Customer customer;
        try {
            customer = Customer.create(userParams);
        } catch (StripeException exception) {
            LOGGER.error("Unable to create user " + user.getFirstName() + " " + user.getLastName());
            throw new ConflictException("Unable to create user " + user.getId());
        }
        return customer.getId();
    }

    public String createStripeCard(User user, Token token) {
        Map<String, Object> retrieveParams = new HashMap<>();
        List<String> expandList = new ArrayList<>();
        expandList.add("sources");
        retrieveParams.put("expand", expandList);

        Customer customer;
        try {
            customer = Customer.retrieve(user.getStripeUserId(), retrieveParams, null);
        } catch (StripeException e) {
            throw new ConflictException("Unable retrieve customer");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("source", token.getId());

        com.stripe.model.Card card;
        try {
            card = (com.stripe.model.Card) customer.getSources().create(params);
            Card cardRepo = new Card();
            cardRepo.setId(card.getId());
            cardRepo.setUser(user);
            cardRepo.setCardFingerprint(card.getFingerprint());
            cardRepository.save(cardRepo);
        } catch (StripeException e) {
            throw new BadRequestException("Unable to save card");
        }
        return card.getId();

    }

    private void checkPaymentRequestValidity(PaymentRequest paymentRequest) {
        Item item = itemRepository
                .findById(paymentRequest.getItemId())
                .orElseThrow(() -> new NotFoundException("Item not found"));
        userRepository
                .findById(paymentRequest.getUserId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        if (paymentRequest.getExpirationYear() < ZonedDateTime.now().getYear()
                || (paymentRequest.getExpirationYear() == ZonedDateTime.now().getYear()
                && paymentRequest.getExpirationMonth() <= ZonedDateTime.now().getMonthValue())) {
            throw new BadRequestException("Card has expired");
        }
        if (shipmentRepository.existsByItemId(paymentRequest.getItemId())) {
            throw new BadRequestException("Item is already sold");
        }
        if (item.getEndDate().isAfter(ZonedDateTime.now())) {
            throw new BadRequestException("Auction is still live");
        }
        Bid bid = bidRepository.findBiggestBidByItemId(paymentRequest.getItemId());
        if (!bid.getUser().getId().equals(paymentRequest.getUserId())) {
            throw new BadRequestException("This user is not the highest bidder");
        }
    }

    private String checkIfCardExists(PaymentRequest paymentRequest, User user) {
        Map<String, Object> cardParams = new HashMap<>();
        cardParams.put("number", paymentRequest.getCardNumber());
        cardParams.put("exp_month", paymentRequest.getExpirationMonth());
        cardParams.put("exp_year", paymentRequest.getExpirationYear());
        cardParams.put("name", paymentRequest.getCardHolderName());
        cardParams.put("cvc", paymentRequest.getCvc());

        Map<String, Object> tokenParams = new HashMap<>();
        tokenParams.put("card", cardParams);
        Token token;
        try {
            token = Token.create(tokenParams);
        } catch (StripeException e) {
            throw new ConflictException("Unable to create Stripe Token");
        }

        List<Card> cards = cardRepository.findAllByUserId(user.getId());
        for (Card card : cards) {
            String fingerprint = card.getCardFingerprint();
            if (fingerprint.equals(token.getCard().getFingerprint())) {
                return card.getId();
            }
        }
        LOGGER.info("Card created");
        return createStripeCard(user, token);
    }

    private void createShipment(PaymentRequest paymentRequest, User user) {
        Item item = itemRepository.findById(paymentRequest.getItemId()).get();
        item.setBuyer(user);
        try {
            itemRepository.save(item);
        } catch (RuntimeException e) {
            throw new ConflictException("Unable to save item");
        }

        Shipment shipment = new Shipment();
        shipment.setZip(paymentRequest.getZip());
        shipment.setCity(paymentRequest.getCity());
        shipment.setCountry(paymentRequest.getCountry());
        shipment.setAddress(paymentRequest.getAddress());
        shipment.setItem(item);
        try {
            shipmentRepository.save(shipment);
        } catch (RuntimeException e) {
            throw new ConflictException("Unable to save shipment");
        }

    }

}
