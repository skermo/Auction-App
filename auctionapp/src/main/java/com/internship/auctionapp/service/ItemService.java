package com.internship.auctionapp.service;

import com.internship.auctionapp.dto.ItemDto;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface ItemService {
    List<ItemDto> getAllItems(int pageNo, int pageSize, String sortBy, String sortDir);
    ItemDto getFirstAvailableItem();
    Page<ItemDto> getAllAvailableItems(int pageNo, int pageSize, String sortBy, String sortDir);
    ItemDto getItemById (UUID id);
    Page<ItemDto> searchItems (String name, String category, int pageNo, int pageSize);


}
