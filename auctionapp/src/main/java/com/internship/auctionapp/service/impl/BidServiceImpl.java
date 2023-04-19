package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.dto.BidDto;
import com.internship.auctionapp.entity.Bid;
import com.internship.auctionapp.repository.BidRepository;
import com.internship.auctionapp.service.BidService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BidServiceImpl implements BidService {
    private final ModelMapper mapper;
    TypeMap<Bid, BidDto> typeMapToDto;
    private final BidRepository bidRepository;

    public BidServiceImpl(BidRepository bidRepository, ModelMapper mapper) {
        this.bidRepository = bidRepository;
        this.mapper = mapper;
        typeMapToDto = mapper.createTypeMap(Bid.class, BidDto.class);
    }

    @Override
    public List<BidDto> getAllBidsByUser(UUID bidder) {
        List<Bid> bids = bidRepository.findAllByUser(bidder);
        return bids.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private BidDto mapToDto(Bid bid) {
        if (typeMapToDto == null) {
            typeMapToDto.addMappings(mapper -> {
                mapper.map(src -> src.getUser().getId(), BidDto::setUserId);
                mapper.map(src -> src.getItem().getId(), BidDto::setItemId);
            });
        }
        return mapper.map(bid, BidDto.class);
    }
}
