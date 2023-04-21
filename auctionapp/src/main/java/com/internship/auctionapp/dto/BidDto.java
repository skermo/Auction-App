package com.internship.auctionapp.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class BidDto {
    private UUID id;
    private UUID userId;
    private UUID itemId;
    private double amount;
}
