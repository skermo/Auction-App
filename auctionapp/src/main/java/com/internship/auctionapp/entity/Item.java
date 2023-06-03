package com.internship.auctionapp.entity;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Locale.Category;
import java.util.UUID;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotNull
    @Size(min = 2, message = "Name must contain at least 2 characters")
    @Size(max = 255, message = "Name cannot contain more than 255 characters")
    private String name;

    @NotNull
    @Positive(message = "Start Price must be positive")
    @Column(name = "start_price")
    private double startPrice;

    @NotNull
    @Column(name = "start_date")
    private ZonedDateTime startDate;

    @NotNull
    @Column(name = "end_date")
    private ZonedDateTime endDate;

    @NotNull
    @Size(min = 2, message = "Description must contain at least 2 characters")
    @Size(max = 1000, message = "Description cannot contain more than 1000 characters")
    private String description;

    @Column(name = "highest_bid")
    private double highestBid;

    @Column(name = "no_bids")
    private int noBids;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcategory_id")
    private Subcategory subcategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id")
    private User buyer;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Bid> bids;

    @OneToOne(mappedBy = "item")
    private Shipment shipment;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notifications;
}
