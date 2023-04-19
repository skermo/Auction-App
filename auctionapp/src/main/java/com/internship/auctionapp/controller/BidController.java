package com.internship.auctionapp.controller;

import com.internship.auctionapp.dto.BidDto;
import com.internship.auctionapp.service.BidService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/bids")
public class BidController {
    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }
    @GetMapping("/{id}")
    public List<BidDto> getAllBidsByUser(@PathVariable(name = "id") UUID bidder){
        return bidService.getAllBidsByUser(bidder);
    }
}
