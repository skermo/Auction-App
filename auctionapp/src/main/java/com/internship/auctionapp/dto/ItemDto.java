package com.internship.auctionapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
    private UUID id;
    private String name;
    private double startPrice;
    private ZonedDateTime startDate;
    private ZonedDateTime endDate;
    private String description;
    private double highestBid;
    private int noBids;
    private UUID categoryId;
    private UUID subcategoryId;
    private UUID buyerId;
    private UUID sellerId;
}
