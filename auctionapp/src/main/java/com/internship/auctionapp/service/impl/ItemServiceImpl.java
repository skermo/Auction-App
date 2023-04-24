package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.dto.ItemDto;
import com.internship.auctionapp.entity.Bid;
import com.internship.auctionapp.entity.Bid;
import com.internship.auctionapp.entity.Item;
import com.internship.auctionapp.repository.BidRepository;
import com.internship.auctionapp.repository.BidRepository;
import com.internship.auctionapp.repository.ItemRepository;
import com.internship.auctionapp.response.ItemResponse;
import com.internship.auctionapp.service.ItemService;
import com.internship.auctionapp.util.StringComparison;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final BidRepository bidRepository;
    private final ModelMapper mapper;

    public ItemServiceImpl(ItemRepository itemRepository, ModelMapper mapper, BidRepository bidRepository) {
        this.itemRepository = itemRepository;
        this.mapper = mapper;
        this.bidRepository = bidRepository;
    }

    @Override
    public List<ItemDto> getAllItems(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Item> items = itemRepository.findAll(pageable);
        List<Item> itemList = items.getContent();
        return itemList.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ItemDto getFirstAvailableItem() {
        LocalDateTime localDateTime = java.time.LocalDateTime.now();
        Item item = itemRepository.findFirstByEndDateGreaterThanEqualAndStartDateLessThanEqual(localDateTime, localDateTime);
        return mapToDto(item);
    }

    @Override
    public Page<ItemDto> getAllAvailableItems(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        LocalDateTime localDateTime = java.time.LocalDateTime.now();
        Page<Item> items = itemRepository.findByEndDateGreaterThanEqualAndStartDateLessThanEqual(localDateTime, localDateTime, pageable);
        return items.map(this::mapToDto);
    }


    @Override
    public ItemDto getItemById(UUID id) {
        return mapToDto(itemRepository.findById(id).get());
    }

    @Override
    public ItemResponse searchItems(String name, String category, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Item> items = itemRepository.searchItems(name, category, pageable);
        String didYouMean = "";
        if (items.isEmpty() && !StringUtils.isEmpty(name)) {
            List<String> itemNames = itemRepository.findAllNames();
            didYouMean = StringComparison
                    .getSuggestedName(name, itemNames)
                    .orElse("");
        }
        return new ItemResponse(
                items.map(this::mapToDto), didYouMean);
    }

    @Override
    public List<ItemDto> getActiveSellerItems(UUID sellerId) {
        LocalDateTime localDateTime = java.time.LocalDateTime.now();
        List<Item> items = itemRepository
                .findByEndDateGreaterThanEqualAndStartDateLessThanEqualAndSeller_Id(
                        localDateTime,
                        localDateTime,
                        sellerId
                );
        return items.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ItemDto> getSoldSellerItems(UUID sellerId) {
        List<Item> items = itemRepository.findSoldItemsByUser(sellerId);
        return items.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ItemDto> getBiddedOnItemsByUser(UUID bidderId) {
        List<Bid> bids = bidRepository.findAllByUser(bidderId);
        List<Item> items = new ArrayList<>();
        for (Bid bid : bids) {
            Item item = itemRepository.findById(bid.getItem().getId()).orElse(null);
            if (item != null) {
                item.setStartPrice(bid.getAmount());
                items.add(item);
            }
        }
        return items.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private ItemDto mapToDto(Item item) {
        return mapper.map(item, ItemDto.class);
    }

}
