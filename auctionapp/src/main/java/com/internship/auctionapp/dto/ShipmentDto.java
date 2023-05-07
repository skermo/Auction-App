package com.internship.auctionapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShipmentDto {
    private UUID id;
    private String address;
    private String country;
    private String city;
    private String zip;
    private UUID item_id;
}
