package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.dto.BidDto;
import com.internship.auctionapp.entity.Bid;
import com.internship.auctionapp.entity.Item;
import com.internship.auctionapp.exception.BadRequestException;
import com.internship.auctionapp.repository.BidRepository;
import com.internship.auctionapp.repository.ItemRepository;
import com.internship.auctionapp.service.BidService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BidServiceImpl implements BidService {
    private final ModelMapper mapper;
    private final BidRepository bidRepository;
    private final ItemRepository itemRepository;

    public BidServiceImpl(BidRepository bidRepository, ModelMapper mapper, ItemRepository itemRepository) {
        this.bidRepository = bidRepository;
        this.mapper = mapper;
        this.itemRepository = itemRepository;
    }

    @Override
    public ResponseEntity<BidDto> saveNewBid(BidDto bidDto) {
        Item item = itemRepository.findById(bidDto.getItemId()).get();
        checkBidValidity(bidDto, item);
        Bid bid;
        if (bidRepository.existsByUserIdAndItemId(bidDto.getUserId(), bidDto.getItemId())) {
            bid = bidRepository
                    .findByUserIdAndItemId(
                            bidDto.getUserId(),
                            bidDto.getItemId());
            bid.setAmount(bidDto.getAmount());
            bidRepository.save(bid);
            return new ResponseEntity<>(mapToDto(bid), HttpStatus.OK);
        } else {
            bid = bidRepository.save(mapToEntity(bidDto));
            return new ResponseEntity<>(mapToDto(bid), HttpStatus.CREATED);
        }
    }

    @Override
    public boolean isHighestBidder(UUID itemId, UUID userId) {
        Bid bid = bidRepository.findBiggestBidByItemId(itemId);
        if(bid != null) return bid.getUser().getId().equals(userId);
        return false;
    }

    @Override
    public BidDto findBidByUserAndItem(UUID userId, UUID itemId) {
        return mapToDto(bidRepository.findByUserIdAndItemId(userId, itemId));
    }

    private BidDto mapToDto(Bid bid) {
        return mapper.map(bid, BidDto.class);
    }

    private Bid mapToEntity(BidDto bidDto) {
        return mapper.map(bidDto, Bid.class);
    }

    private void checkBidValidity(BidDto bidDto, Item item) {
        LocalDateTime now = java.time.LocalDateTime.now();
        if (bidDto.getAmount() < item.getStartPrice()) {
            throw new BadRequestException("Bid cannot be lower than item's start price.");
        }
        if (bidDto.getAmount() <= item.getHighestBid()) {
            throw new BadRequestException("Bid cannot be lower than item's highest bid");
        }
        if (item.getEndDate().isBefore(now)) {
            throw new BadRequestException("Bidding for this item has ended.");
        }
        if (item.getSeller().getId() == bidDto.getUserId()) {
            throw new BadRequestException("A seller cannot bid on their own item");
        }
    }
}
