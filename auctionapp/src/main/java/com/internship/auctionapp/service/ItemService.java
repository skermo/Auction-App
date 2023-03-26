package com.internship.auctionapp.service;

import com.internship.auctionapp.dto.ItemDto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ItemService {
    List<ItemDto> getAllItems(int pageNo, int pageSize, String sortBy, String sortDir);
    ItemDto getFirstAvailableItem();
    List<ItemDto> getAllAvailableItems(int pageNo, int pageSize, String sortBy, String sortDir);
    ItemDto getItemById (UUID id);
}
