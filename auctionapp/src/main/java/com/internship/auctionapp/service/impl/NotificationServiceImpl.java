package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.dto.NotificationDto;
import com.internship.auctionapp.entity.Notification;
import com.internship.auctionapp.exception.BadRequestException;
import com.internship.auctionapp.repository.NotificationRepository;
import com.internship.auctionapp.service.NotificationService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
import java.util.List;
import java.util.UUID;

@Service
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final ModelMapper mapper;

    public NotificationServiceImpl(NotificationRepository notificationRepository, ModelMapper mapper) {
        this.notificationRepository = notificationRepository;
        this.mapper = mapper;
    }

    @Override
    public Page<NotificationDto> getAllUnreadNotifications(UUID userId, int pageNo, int pageSize) {
        Sort sort = Sort.by("dateTime").descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Notification> page = notificationRepository.findAllByUserId(userId, pageable);
        return page.map(this::mapToDto);
    }

    @Override
    public void deleteNotification(UUID id) {
        try {
            notificationRepository.deleteById(id);
        } catch (Exception e) {
            throw new BadRequestException("Notification with id " + id + " not found");
        }
    }

    @Override
    public Flux<ServerSentEvent<List<NotificationDto>>> streamLastNotificationByUserId(UUID id) {
        return Flux.interval(Duration.ofSeconds(1))
                .publishOn(Schedulers.boundedElastic())
                .map(sequence -> ServerSentEvent.<List<NotificationDto>>builder()
                        .id(String.valueOf(sequence))
                        .event("user-list-event")
                        .data(getUndeliveredNotifications(id))
                        .build());
    }

    private List<NotificationDto> getUndeliveredNotifications(UUID userID) {
        return notificationRepository.findAllByUserId(userID).stream()
                .map(this::mapToDto)
                .toList();
    }

    private NotificationDto mapToDto(Notification notification) {
        return mapper.map(notification, NotificationDto.class);
    }
}
