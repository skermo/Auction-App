package com.internship.auctionapp.service;

import com.internship.auctionapp.dto.BidDto;
import com.internship.auctionapp.entity.Bid;
import com.internship.auctionapp.entity.Item;
import com.internship.auctionapp.entity.User;
import com.internship.auctionapp.exception.BadRequestException;
import com.internship.auctionapp.repository.BidRepository;
import com.internship.auctionapp.repository.ItemRepository;
import com.internship.auctionapp.service.impl.BidServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
class BidServiceTest {

    @Mock
    ItemRepository itemRepository;
    @Mock
    ModelMapper mapper = new ModelMapper();
    @Mock
    private BidRepository bidRepository;
    @InjectMocks
    private BidServiceImpl bidService;

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }


    @Test
    void test_saveNewBid_throws_exception_if_amount_lower_than_start_price() {

        BidDto bidDto = getValidBidDto();
        bidDto.setAmount(5);

        Item item = getValidItem();
        item.setStartPrice(18);
        item.setHighestBid(4);

        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.ofNullable(item));
        assertThrows(BadRequestException.class, () -> bidService.saveNewBid(bidDto));
    }

    @Test
    void test_saveNewBid_throws_exception_if_amount_lower_than_highest_bid() {

        BidDto bidDto = getValidBidDto();
        bidDto.setAmount(5);

        Item item = getValidItem();

        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.ofNullable(item));
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
        bidService.saveNewBid(bidDto);
        Mockito.verify(bidRepository, Mockito.times(1)).save(ArgumentMatchers.any(Bid.class));

    }

    @Test
    void test_saveNewBid_creates_new_bid() {

        BidDto bidDto = getValidBidDto();

        Item item = getValidItem();

        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.of(item));
        Mockito.when(bidRepository.existsByUserIdAndItemId(Mockito.any(), Mockito.any())).thenReturn(false);
        bidService.saveNewBid(bidDto);
        Mockito.verify(bidRepository, Mockito.times(1)).save(ArgumentMatchers.any());

    }

    @Test
    void test_saveNewBidWithLondonTimezone_creates_new_bid(){

        BidDto bidDto = getValidBidDto();

        Item item = getValidItemLondonOneHourAhead();

        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.of(item));
        Mockito.when(bidRepository.existsByUserIdAndItemId(Mockito.any(), Mockito.any())).thenReturn(false);
        bidService.saveNewBid(bidDto);
        Mockito.verify(bidRepository, Mockito.times(1)).save(ArgumentMatchers.any());

    }

    @Test
    void test_saveNewBidWithRigaTimezone_throws_exception_if_end_date_passed(){

        BidDto bidDto = getValidBidDto();

        Item item = getItemRigaTimeNow();

        Mockito.when(itemRepository.findById(bidDto.getItemId())).thenReturn(Optional.ofNullable(item));
        assertThrows(BadRequestException.class, () -> bidService.saveNewBid(bidDto));
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
        return ZonedDateTime.of(
                2024, 12, 3, 12, 20, 59,
                90000, ZoneId.systemDefault());
    }

    private ZonedDateTime getInvalidDate() {
        return ZonedDateTime.of(
                2020, 12, 3, 12, 20, 59,
                90000, ZoneId.systemDefault());
    }

    private Item getValidItemLondonOneHourAhead(){
        return Item.builder()
                .id(UUID.randomUUID())
                .startPrice(3)
                .highestBid(6)
                .endDate(getLondonTimeOneHourAhead())
                .seller(new User())
                .build();
    }

    private Item getItemRigaTimeNow(){
        return Item.builder()
                .id(UUID.randomUUID())
                .startPrice(3)
                .highestBid(6)
                .endDate(getRigaTimeNow())
                .seller(new User())
                .build();
    }

    private Instant getInstantOneHourAhead(){
        Instant instant = Instant.now();
        return instant.plus(1, ChronoUnit.HOURS);
    }

    private ZonedDateTime getLondonTimeOneHourAhead(){
        return ZonedDateTime.ofInstant(getInstantOneHourAhead(), ZoneId.of("Europe/London"));
    }

    private ZonedDateTime getRigaTimeNow(){
        return ZonedDateTime.ofInstant(Instant.now(), ZoneId.of("Europe/Riga"));
    }
}