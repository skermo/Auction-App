package com.internship.auctionapp.repository;

import com.internship.auctionapp.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID> {
    Item findFirstByEndDateGreaterThanEqualAndStartDateLessThanEqual(ZonedDateTime endDate, ZonedDateTime startDate);

    Page<Item> findByEndDateGreaterThanEqualAndStartDateLessThanEqual(ZonedDateTime endDate, ZonedDateTime startDate, Pageable pageable);

    @Query("SELECT i FROM Item i " +
            "WHERE i.endDate >= NOW() AND i.startDate <= NOW() " +
            "AND (LOWER(i.name) LIKE LOWER(CONCAT('%', :name, '%') ) " +
            "OR LOWER(i.category.name) LIKE LOWER(CONCAT('%', :name, '%') ) )" +
            "AND i.category.name LIKE CONCAT('%', :category, '%') ")
    Page<Item> searchItems(String name, String category, Pageable pageable);

    @Query("SELECT i.name FROM Item i " +
            "WHERE i.endDate >= NOW() AND i.startDate <= NOW()")
    List<String> findAllNames();

    List<Item> findByEndDateGreaterThanEqualAndStartDateLessThanEqualAndSeller_Id(ZonedDateTime endDate, ZonedDateTime startDate, UUID sellerId);

    @Query("SELECT i FROM Item i " +
            "INNER JOIN Shipment s ON i.id = s.item.id " +
            "WHERE i.seller.id = :sellerId")
    List<Item> findSoldItemsByUser(UUID sellerId);

    @Query("SELECT i FROM Item i " +
            "JOIN Bid b ON b.item.id = i.id " +
            "WHERE (b.user.id = :userId OR i.seller.id = :userId)")
    List<Item> findItemsUserIsInterestedIn(UUID userId);

    @Query("SELECT i FROM Item i " +
            "WHERE (i.endDate >= NOW() AND i.startDate <= NOW()) AND " +
            "i.seller.id != :userId AND i.category.id = :categoryId AND " +
            "i.id NOT IN (SELECT b.item.id FROM Bid b WHERE b.user.id = :userId) ")
    List<Item> findRecommendedItemsByCategory(UUID userId, UUID categoryId);

    @Query("SELECT i FROM Item i " +
            "WHERE i.endDate >= NOW() AND i.startDate <= NOW() AND " +
            "i.seller.id != :userId AND (i.startPrice BETWEEN :price - 50 AND :price + 50) AND " +
            "i.id NOT IN (SELECT b.item.id FROM Bid b WHERE b.user.id = :userId) ")
    List<Item> findRecommendedItemsByPrice(UUID userId, double price);
}