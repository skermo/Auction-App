package com.internship.auctionapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
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
}
