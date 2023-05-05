package com.internship.auctionapp.repository;

import com.internship.auctionapp.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface BidRepository extends JpaRepository<Bid, UUID> {
    @Query("SELECT b FROM Bid b " +
            "WHERE b.user.id = :bidder")
    List<Bid> findAllByUser(UUID bidder);
    boolean existsByUserIdAndItemId(UUID userId, UUID itemId);
    Bid findByUserIdAndItemId(UUID userId, UUID itemId);
    @Query("SELECT b FROM Bid b " +
            "WHERE b.item.id = :itemId " +
            "ORDER BY amount DESC " +
            "LIMIT 1")
    Bid findBiggestBidByItemId(UUID itemId);
}
