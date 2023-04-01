package com.internship.auctionapp.service;

import com.internship.auctionapp.dto.ItemDto;
import com.internship.auctionapp.dto.ItemResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ItemService {
    List<ItemDto> getAllItems(int pageNo, int pageSize, String sortBy, String sortDir);
    ItemDto getFirstAvailableItem();
    ItemResponse getAllAvailableItems(int pageNo, int pageSize, String sortBy, String sortDir);
    ItemDto getItemById (UUID id);
    ItemResponse searchItems (String name, String category, int pageNo, int pageSize);


}
