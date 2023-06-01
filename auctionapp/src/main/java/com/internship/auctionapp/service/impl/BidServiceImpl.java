package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.dto.BidDto;
import com.internship.auctionapp.dto.NotificationDto;
import com.internship.auctionapp.entity.Bid;
import com.internship.auctionapp.entity.Item;
import com.internship.auctionapp.entity.Notification;
import com.internship.auctionapp.enums.NotificationType;
import com.internship.auctionapp.exception.BadRequestException;
import com.internship.auctionapp.repository.BidRepository;
import com.internship.auctionapp.repository.ItemRepository;
import com.internship.auctionapp.repository.NotificationRepository;
import com.internship.auctionapp.service.BidService;
import com.internship.auctionapp.service.SseEmitterService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.UUID;

@Service
public class BidServiceImpl implements BidService {
    private final ModelMapper mapper;
    private final BidRepository bidRepository;
    private final ItemRepository itemRepository;
    private final NotificationRepository notificationRepository;
    private final SseEmitterService sseEmitterService;

    public BidServiceImpl(BidRepository bidRepository, ModelMapper mapper, ItemRepository itemRepository, NotificationRepository notificationRepository, SseEmitterService sseEmitterService) {
        this.bidRepository = bidRepository;
        this.mapper = mapper;
        this.itemRepository = itemRepository;
        this.notificationRepository = notificationRepository;
        this.sseEmitterService = sseEmitterService;
    }

    @Override
    public ResponseEntity<BidDto> saveNewBid(BidDto bidDto) {
        Item item = itemRepository.findById(bidDto.getItemId()).get();
        checkBidValidity(bidDto, item);
        Bid bid;
        Bid currentHighestBid = bidRepository.findBiggestBidByItemId(item.getId());
        if (bidRepository.existsByUserIdAndItemId(bidDto.getUserId(), bidDto.getItemId())) {
            if (!currentHighestBid.getUser().getId().equals(bidDto.getUserId())) {

                notifyPreviousHighestBidder(item, currentHighestBid);
            }
            bid = bidRepository
                    .findByUserIdAndItemId(
                            bidDto.getUserId(),
                            bidDto.getItemId());
            bid.setAmount(bidDto.getAmount());
            bidRepository.save(bid);
            sseEmitterService.notify(
                    mapToDto(bid),
                    bid.getItem().getId().toString()
            );
            return new ResponseEntity<>(mapToDto(bid), HttpStatus.OK);
        } else {
            if (item.getHighestBid() != 0) {
                notifyPreviousHighestBidder(item, currentHighestBid);
            }
            bid = bidRepository.save(mapToEntity(bidDto));
            sseEmitterService.notify(
                    mapToDto(bid),
                    bid.getItem().getId().toString()
            );
            return new ResponseEntity<>(mapToDto(bid), HttpStatus.CREATED);
        }
    }

    private void notifyPreviousHighestBidder(Item item, Bid currentHighestBid) {
        Notification notification = Notification
                .builder()
                .user(currentHighestBid.getUser())
                .item(item)
                .type(NotificationType.OUTBID)
                .dateTime(ZonedDateTime.now())
                .build();
        notificationRepository.save(notification);
        sseEmitterService.notify(
                mapper.map(notification, NotificationDto.class),
                notification.getUser().getId().toString()
        );
    }

    @Override
    public boolean isHighestBidder(UUID itemId, UUID userId) {
        Bid bid = bidRepository.findBiggestBidByItemId(itemId);
        if (bid != null) return bid.getUser().getId().equals(userId);
        return false;
    }

    @Override
    public BidDto findBidByUserAndItem(UUID userId, UUID itemId) {
        return mapToDto(bidRepository.findByUserIdAndItemId(userId, itemId));
    }

    private BidDto mapToDto(Bid bid) {
        return mapper.map(bid, BidDto.class);
    }

    private Bid mapToEntity(BidDto bidDto) {
        return mapper.map(bidDto, Bid.class);
    }

    private void checkBidValidity(BidDto bidDto, Item item) {
        ZonedDateTime now = java.time.ZonedDateTime.now();
        if (bidDto.getAmount() < item.getStartPrice()) {
            throw new BadRequestException("Bid cannot be lower than item's start price.");
        }
        if (bidDto.getAmount() <= item.getHighestBid()) {
            throw new BadRequestException("Bid cannot be lower than item's highest bid");
        }
        if (item.getEndDate().isBefore(now)) {
            throw new BadRequestException("Bidding for this item has ended.");
        }
        if (item.getSeller().getId() == bidDto.getUserId()) {
            throw new BadRequestException("A seller cannot bid on their own item");
        }
    }
}
