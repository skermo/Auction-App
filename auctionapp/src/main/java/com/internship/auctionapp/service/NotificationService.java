package com.internship.auctionapp.service;

import com.internship.auctionapp.dto.NotificationDto;
import org.springframework.data.domain.Page;
import org.springframework.http.codec.ServerSentEvent;
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.UUID;

public interface NotificationService {
    Page<NotificationDto> getAllUnreadNotifications(UUID userId, int pageNo, int pageSize);

    void deleteNotification(UUID id);

    Flux<ServerSentEvent<List<NotificationDto>>> streamLastNotificationByUserId(UUID id);
}
