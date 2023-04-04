package com.internship.auctionapp.repository;

import com.internship.auctionapp.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID> {
    Item findFirstByEndDateGreaterThanEqualAndStartDateLessThanEqual (LocalDateTime endDate, LocalDateTime startDate);
    Page<Item> findByEndDateGreaterThanEqualAndStartDateLessThanEqual (LocalDateTime endDate, LocalDateTime startDate, Pageable pageable);
    @Query ("SELECT i FROM Item i " +
            "WHERE i.endDate >= NOW() AND i.startDate <= NOW() " +
            "AND (LOWER(i.name) LIKE LOWER(CONCAT('%', :name, '%') ) " +
            "OR LOWER(i.category.name) LIKE LOWER(CONCAT('%', :name, '%') ) )" +
            "AND i.category.name LIKE CONCAT('%', :category, '%') ")
    Page<Item> searchItems (String name, String category, Pageable pageable);

}