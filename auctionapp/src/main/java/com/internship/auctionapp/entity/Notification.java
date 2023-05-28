package com.internship.auctionapp.entity;

import com.internship.auctionapp.enums.NotificationType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotNull
    private NotificationType type;

    @NotNull
    @Column(name = "date_time")
    private ZonedDateTime dateTime;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
