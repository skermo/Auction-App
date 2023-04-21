package com.internship.auctionapp.controller;

import com.internship.auctionapp.dto.BidDto;
import com.internship.auctionapp.service.BidService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/bids")
public class BidController {
    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @PostMapping("/new-bid")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<BidDto> register(@RequestBody BidDto bidDto) {
        BidDto response = bidService.saveNewBid(bidDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
