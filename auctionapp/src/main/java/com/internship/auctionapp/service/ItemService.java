package com.internship.auctionapp.service;

import com.internship.auctionapp.dto.ItemDto;

import java.time.LocalDateTime;
import java.util.List;

public interface ItemService {
    List<ItemDto> getAllItems(int pageNo, int pageSize, String sortBy, String sortDir);
    ItemDto getFirstItemByAvailability(LocalDateTime endDate);
}
