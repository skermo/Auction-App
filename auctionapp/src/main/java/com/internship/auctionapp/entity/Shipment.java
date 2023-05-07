package com.internship.auctionapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotNull
    private String address;

    @NotNull
    private String country;

    @NotNull
    private String city;

    @NotNull
    private String zip;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "item_id")
    private Item item;
}
