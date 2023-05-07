package com.internship.auctionapp.service;

import com.internship.auctionapp.dto.BidDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface BidService {
    ResponseEntity<BidDto> saveNewBid (BidDto bidDto);
    boolean isHighestBidder (UUID itemId, UUID userId);

    BidDto findBidByUserAndItem(UUID userId, UUID itemId);
}
