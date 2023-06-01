package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.dto.NotificationDto;
import com.internship.auctionapp.entity.Bid;
import com.internship.auctionapp.entity.Item;
import com.internship.auctionapp.entity.Notification;
import com.internship.auctionapp.enums.NotificationType;
import com.internship.auctionapp.repository.BidRepository;
import com.internship.auctionapp.repository.ItemRepository;
import com.internship.auctionapp.repository.NotificationRepository;
import com.internship.auctionapp.service.SchedulerService;
import com.internship.auctionapp.service.SseEmitterService;
import org.modelmapper.ModelMapper;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
@EnableScheduling
public class SchedulerServiceImpl implements SchedulerService {

    private final ItemRepository itemRepository;
    private final NotificationRepository notificationRepository;
    private final BidRepository bidRepository;
    private final SseEmitterService sseEmitterService;
    private final ModelMapper mapper;

    public SchedulerServiceImpl(ItemRepository itemRepository, NotificationRepository notificationRepository, BidRepository bidRepository, SseEmitterService sseEmitterService, ModelMapper mapper) {
        this.itemRepository = itemRepository;
        this.notificationRepository = notificationRepository;
        this.bidRepository = bidRepository;
        this.sseEmitterService = sseEmitterService;
        this.mapper = mapper;
    }

    @Override
    @Scheduled(fixedDelay = 300000)
    public void notifyAuctionWon() {
        List<Item> expiredItems = itemRepository.findByEndDateGreaterThanEqualAndEndDateLessThanAndHighestBidNotNull(
                ZonedDateTime.now().minusMinutes(5),
                ZonedDateTime.now());
        for (Item expiredItem : expiredItems) {
            Bid highestBid = bidRepository.findBiggestBidByItemId(expiredItem.getId());
            Notification notification = Notification.builder()
                    .item(expiredItem)
                    .user(highestBid.getUser())
                    .type(NotificationType.HIGHEST_BIDDER)
                    .dateTime(ZonedDateTime.now())
                    .build();
            notificationRepository.save(notification);
            sseEmitterService.notify(
                    mapper.map(notification, NotificationDto.class),
                    notification.getUser().getId().toString()
            );
        }
    }
}
