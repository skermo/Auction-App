package com.internship.auctionapp.dto;

import com.internship.auctionapp.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {
    private UUID id;
    private NotificationType type;
    private UUID itemId;
    private UUID userId;
    private ZonedDateTime dateTime;
}
