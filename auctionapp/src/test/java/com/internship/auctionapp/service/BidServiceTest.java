package com.internship.auctionapp.service;

import com.internship.auctionapp.dto.BidDto;
import com.internship.auctionapp.entity.Bid;
import com.internship.auctionapp.entity.Item;
import com.internship.auctionapp.entity.Notification;
import com.internship.auctionapp.entity.User;
import com.internship.auctionapp.exception.BadRequestException;
import com.internship.auctionapp.repository.BidRepository;
import com.internship.auctionapp.repository.ItemRepository;
import com.internship.auctionapp.repository.NotificationRepository;
import com.internship.auctionapp.service.impl.BidServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.modelmapper.ModelMapper;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class BidServiceTest {

    @Mock
    ItemRepository itemRepository;
    @Mock
    ModelMapper mapper = new ModelMapper();
    @Mock
    private BidRepository bidRepository;
    @Mock
    private SseEmitterService sseEmitterService;
    @Mock
    private NotificationRepository notificationRepository;
    @InjectMocks
    private BidServiceImpl bidService;

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void test_saveNewBid_throws_if_bid_just_below_start_price() {
        BidDto bidDto = getValidBidDto();
        bidDto.setAmount(99);

        Item item = getValidItem();
        item.setStartPrice(100);
        item.setHighestBid(0);

        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.of(item));
        assertThrows(BadRequestException.class, () -> bidService.saveNewBid(bidDto));
    }

    @Test
    void test_saveNewBid_throws_exception_if_end_date_passed() {

        BidDto bidDto = getValidBidDto();

        Item item = getValidItem();
        item.setEndDate(getInvalidDate());

        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.ofNullable(item));
        assertThrows(BadRequestException.class, () -> bidService.saveNewBid(bidDto));
    }

    @Test
    void test_saveNewBid_throws_exception_if_sellerId_equals_bidderId() {

        BidDto bidDto = getValidBidDto();

        User user = User.builder()
                .id(bidDto.getUserId())
                .build();

        Item item = getValidItem();
        item.setSeller(user);

        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.ofNullable(item));
        assertThrows(BadRequestException.class, () -> bidService.saveNewBid(bidDto));
    }

    @Test
    void test_saveNewBid_accepts_bid_equal_to_start_price() {
        BidDto bidDto = getValidBidDto();
        bidDto.setAmount(100);

        Item item = getValidItem();
        item.setStartPrice(100);
        item.setHighestBid(0);

        Bid bid = Bid.builder()
                .id(bidDto.getId())
                .item(Item.builder().id(bidDto.getItemId()).build())
                .user(User.builder().id(bidDto.getUserId()).build())
                .amount(bidDto.getAmount())
                .build();

        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.of(item));
        Mockito.when(bidRepository.existsByUserIdAndItemId(Mockito.any(), Mockito.any())).thenReturn(false);
        Mockito.when(bidRepository.save(Mockito.any())).thenReturn(bid);
        Mockito.doNothing().when(sseEmitterService).notify(Mockito.any(), Mockito.any());

        bidService.saveNewBid(bidDto);

        Mockito.verify(bidRepository, Mockito.times(1)).save(Mockito.any());
    }

    @Test
    void test_saveNewBid_updates_existing_bid() {

        BidDto bidDto = getValidBidDto();

        Bid bid = Bid.builder()
                .id(bidDto.getId())
                .item(Item.builder().id(bidDto.getItemId()).build())
                .user(User.builder().id(bidDto.getUserId()).build())
                .amount(bidDto.getAmount())
                .build();

        Item item = getValidItem();

        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.of(item));
        Mockito.when(bidRepository.existsByUserIdAndItemId(Mockito.any(), Mockito.any())).thenReturn(true);
        Mockito.when(bidRepository.findByUserIdAndItemId(Mockito.any(), Mockito.any())).thenReturn(bid);
        Mockito.doNothing().when(sseEmitterService).notify(Mockito.any(), Mockito.any());
        Mockito.when(bidRepository.findBiggestBidByItemId(Mockito.any())).thenReturn(bid);
        bidService.saveNewBid(bidDto);
        Mockito.verify(bidRepository, Mockito.times(1)).save(ArgumentMatchers.any(Bid.class));

    }

    @Test
    void test_saveNewBid_creates_new_bid() {

        BidDto bidDto = getValidBidDto();
        Item item = getValidItem();
        Bid bid = Bid.builder()
                .id(bidDto.getId())
                .item(Item.builder().id(bidDto.getItemId()).build())
                .user(User.builder().id(bidDto.getUserId()).build())
                .amount(bidDto.getAmount())
                .build();
        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.of(item));
        Mockito.when(bidRepository.existsByUserIdAndItemId(Mockito.any(), Mockito.any())).thenReturn(false);
        Mockito.doNothing().when(sseEmitterService).notify(Mockito.any(), Mockito.any());
        Mockito.when(notificationRepository.save(Mockito.any())).thenAnswer(invocation -> invocation.getArgument(0));
        Mockito.when(bidRepository.save(Mockito.any())).thenReturn(bid);
        bidService.saveNewBid(bidDto);
        Mockito.verify(bidRepository, Mockito.times(1)).save(ArgumentMatchers.any());
    }

    @Test
    void test_saveNewBidWithLondonTimezone_creates_new_bid() {

        BidDto bidDto = getValidBidDto();
        Item item = getValidItemLondonOneHourAhead();
        Bid bid = Bid.builder()
                .id(bidDto.getId())
                .item(Item.builder().id(bidDto.getItemId()).build())
                .user(User.builder().id(bidDto.getUserId()).build())
                .amount(bidDto.getAmount())
                .build();

        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.of(item));
        Mockito.when(bidRepository.existsByUserIdAndItemId(Mockito.any(), Mockito.any())).thenReturn(false);
        Mockito.lenient().when(bidRepository.save(Mockito.any())).thenReturn(bid);
        Mockito.doNothing().when(sseEmitterService).notify(Mockito.any(), Mockito.any());

        bidService.saveNewBid(bidDto);

        Mockito.verify(bidRepository, Mockito.times(1)).save(ArgumentMatchers.any());
    }

    @Test
    void test_saveNewBidWithRigaTimezone_throws_exception_if_end_date_passed() {
        BidDto bidDto = getValidBidDto();

        Item item = getItemRigaTimeNow();

        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.ofNullable(item));
        assertThrows(BadRequestException.class, () -> bidService.saveNewBid(bidDto));
    }

    @Test
    void test_saveNewBid_user_updates_existing_bid_and_is_not_current_highest() {
        BidDto bidDto = getValidBidDto();
        bidDto.setAmount(100);

        Item item = getValidItem();
        item.setHighestBid(90);

        User highestBidder = User.builder().id(UUID.randomUUID()).build();
        Bid currentHighestBid = Bid.builder()
                .user(highestBidder)
                .item(item)
                .amount(90)
                .build();

        Bid userBid = Bid.builder()
                .user(User.builder().id(bidDto.getUserId()).build())
                .item(item)
                .amount(80)
                .build();

        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.of(item));
        Mockito.when(bidRepository.findBiggestBidByItemId(item.getId())).thenReturn(currentHighestBid);
        Mockito.when(bidRepository.existsByUserIdAndItemId(Mockito.any(), Mockito.any())).thenReturn(true);
        Mockito.when(bidRepository.findByUserIdAndItemId(Mockito.any(), Mockito.any())).thenReturn(userBid);
        Mockito.when(notificationRepository.save(Mockito.any())).thenReturn(new Notification());

        Mockito.doNothing().when(sseEmitterService).notify(Mockito.any(), Mockito.any());

        bidService.saveNewBid(bidDto);

        Mockito.verify(notificationRepository, Mockito.times(1)).save(Mockito.any());
    }

    @Test
    void test_saveNewBid_user_is_already_highest_bidder_should_not_notify() {
        BidDto bidDto = getValidBidDto();
        bidDto.setAmount(100);

        Item item = getValidItem();
        item.setHighestBid(90);

        UUID userId = bidDto.getUserId();

        Bid currentHighestBid = Bid.builder()
                .user(User.builder().id(userId).build())
                .item(item)
                .amount(90)
                .build();

        Bid userBid = Bid.builder()
                .user(User.builder().id(userId).build())
                .item(item)
                .amount(80)
                .build();

        Bid bid = Bid.builder()
                .id(bidDto.getId())
                .item(Item.builder().id(bidDto.getItemId()).build())
                .user(User.builder().id(bidDto.getUserId()).build())
                .amount(bidDto.getAmount())
                .build();

        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.of(item));
        Mockito.when(bidRepository.findBiggestBidByItemId(item.getId())).thenReturn(currentHighestBid);
        Mockito.when(bidRepository.existsByUserIdAndItemId(Mockito.any(), Mockito.any())).thenReturn(true);
        Mockito.when(bidRepository.findByUserIdAndItemId(userId, item.getId())).thenReturn(userBid);
        Mockito.lenient().when(bidRepository.save(Mockito.any())).thenReturn(bid);
        Mockito.when(bidRepository.findByUserIdAndItemId(Mockito.any(), Mockito.any())).thenReturn(bid);
        Mockito.doNothing().when(sseEmitterService).notify(Mockito.any(), Mockito.any());

        bidService.saveNewBid(bidDto);

        Mockito.verify(notificationRepository, Mockito.never()).save(Mockito.any());
    }

    @Test
    void test_saveNewBid_bidEqualToOrLowerThanHighest_shouldThrowException() {
        UUID userId = UUID.randomUUID();
        UUID itemId = UUID.randomUUID();

        Item item = Item.builder()
                .id(itemId)
                .startPrice(100)
                .highestBid(150)
                .endDate(ZonedDateTime.now().plusDays(1))
                .seller(User.builder().id(UUID.randomUUID()).build())
                .build();

        BidDto bidDto = BidDto.builder()
                .id(UUID.randomUUID())
                .userId(userId)
                .itemId(itemId)
                .amount(130)
                .build();

        Mockito.when(itemRepository.findById(itemId)).thenReturn(Optional.of(item));

        BadRequestException exception = assertThrows(
                BadRequestException.class,
                () -> bidService.saveNewBid(bidDto)
        );

        Assertions.assertEquals("Bid cannot be lower than item's highest bid", exception.getMessage());
    }

    @Test
    void test_saveNewBid_sends_notification_to_previous_highest_bidder() {
        BidDto bidDto = getValidBidDto();
        bidDto.setAmount(150);

        Item item = getValidItem();
        item.setHighestBid(100);

        UUID previousBidderId = UUID.randomUUID();
        User previousBidder = User.builder().id(previousBidderId).build();

        Bid currentHighestBid = Bid.builder()
                .user(previousBidder)
                .item(item)
                .amount(100)
                .build();

        Bid bid = Bid.builder()
                .id(bidDto.getId())
                .item(Item.builder().id(bidDto.getItemId()).build())
                .user(User.builder().id(bidDto.getUserId()).build())
                .amount(bidDto.getAmount())
                .build();

        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.of(item));
        Mockito.when(bidRepository.findBiggestBidByItemId(item.getId())).thenReturn(currentHighestBid);
        Mockito.when(bidRepository.existsByUserIdAndItemId(bidDto.getUserId(), item.getId())).thenReturn(false);
        Mockito.when(bidRepository.save(Mockito.any())).thenAnswer(invocation -> invocation.getArgument(0));
        Mockito.when(notificationRepository.save(Mockito.any())).thenAnswer(invocation -> invocation.getArgument(0));
        Mockito.doNothing().when(sseEmitterService).notify(Mockito.any(), Mockito.any());
        Mockito.lenient().when(bidRepository.save(Mockito.any())).thenReturn(bid);

        bidService.saveNewBid(bidDto);

        Mockito.verify(notificationRepository, Mockito.times(1)).save(Mockito.any());
        Mockito.verify(sseEmitterService, Mockito.atLeastOnce()).notify(Mockito.any(), Mockito.eq(previousBidderId.toString()));
    }
    
    private BidDto getValidBidDto() {
        return BidDto.builder()
                .id(UUID.randomUUID())
                .itemId(UUID.randomUUID())
                .userId(UUID.randomUUID())
                .amount(50)
                .build();
    }

    private Item getValidItem() {
        return Item.builder()
                .id(UUID.randomUUID())
                .startPrice(3)
                .highestBid(6)
                .endDate(getValidDate())
                .seller(new User())
                .build();
    }

    private ZonedDateTime getValidDate() {
        return ZonedDateTime.now().plusYears(1);
    }

    private ZonedDateTime getInvalidDate() {
        return ZonedDateTime.of(
                2020, 12, 3, 12, 20, 59,
                90000, ZoneId.systemDefault());
    }

    private Item getValidItemLondonOneHourAhead() {
        return Item.builder()
                .id(UUID.randomUUID())
                .startPrice(3)
                .highestBid(6)
                .endDate(getLondonTimeOneHourAhead())
                .seller(new User())
                .build();
    }

    private Item getItemRigaTimeNow() {
        return Item.builder()
                .id(UUID.randomUUID())
                .startPrice(3)
                .highestBid(6)
                .endDate(getRigaTimeNow())
                .seller(new User())
                .build();
    }

    private Instant getInstantOneHourAhead() {
        Instant instant = Instant.now();
        return instant.plus(1, ChronoUnit.HOURS);
    }

    private ZonedDateTime getLondonTimeOneHourAhead() {
        return ZonedDateTime.ofInstant(getInstantOneHourAhead(), ZoneId.of("Europe/London"));
    }

    private ZonedDateTime getRigaTimeNow() {
        return ZonedDateTime.ofInstant(Instant.now(), ZoneId.of("Europe/Riga"));
    }
}