package com.internship.auctionapp.repository;

import com.internship.auctionapp.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID> {
    Item findFirstByEndDateGreaterThanEqual (LocalDateTime endDate);
}