package com.internship.auctionapp.service;

import com.internship.auctionapp.dto.BidDto;

import java.util.List;
import java.util.UUID;

public interface BidService {
    BidDto saveNewBid (BidDto bidDto);
}
