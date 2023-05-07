package com.internship.auctionapp.controller;

import com.internship.auctionapp.dto.BidDto;
import com.internship.auctionapp.service.BidService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/bids")
public class BidController {
    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority(T(com.internship.auctionapp.enums.UserRole).USER, " +
            "T(com.internship.auctionapp.enums.UserRole).ADMIN)")
    public ResponseEntity<BidDto> newBid(@RequestBody BidDto bidDto) {
        return bidService.saveNewBid(bidDto);
    }
    @GetMapping("/highest-bid/{userId}/{itemId}")
    public boolean isHighestBidder(@PathVariable("userId") UUID userId, @PathVariable("itemId") UUID itemId){
        return bidService.isHighestBidder(itemId, userId);
    }
    @GetMapping("/{userId}/{itemId}")
    public BidDto getBidByUserIdAndItemId(@PathVariable("userId") UUID userId, @PathVariable("itemId") UUID itemId){
        return bidService.findBidByUserAndItem(userId, itemId);
    }
}
