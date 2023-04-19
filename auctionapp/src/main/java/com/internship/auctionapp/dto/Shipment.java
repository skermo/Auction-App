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
public class Shipment {
    private UUID id;
    private String address;
    private String country;
    private String city;
    private int zip;
    private String phoneNumber;
    private UUID item_id;
}
