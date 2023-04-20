package com.internship.auctionapp.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
    private UUID id;
    private String name;
    private double startPrice;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String description;
    private double highestBid;
    private int noBids;
    private UUID categoryId;
    private UUID subcategoryId;
    private UUID buyerId;
    private UUID sellerId;
}
