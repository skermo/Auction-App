package com.internship.auctionapp.service;

import com.internship.auctionapp.dto.ItemDto;
import com.internship.auctionapp.entity.Item;
import com.internship.auctionapp.request.ItemRequest;
import com.internship.auctionapp.response.ItemResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ItemService {
    List<ItemDto> getAllItems(int pageNo, int pageSize, String sortBy, String sortDir);
    ItemDto getFirstAvailableItem();
    Page<ItemDto> getAllAvailableItems(int pageNo, int pageSize, String sortBy, String sortDir);
    ItemDto getItemById (UUID id);
    ItemResponse searchItems (String name, String category, int pageNo, int pageSize);
    List<ItemDto> getActiveSellerItems(UUID sellerId);
    List<ItemDto> getSoldSellerItems(UUID sellerId);
    List<ItemDto> getBiddedOnItemsByUser(UUID bidderId);
    HttpStatus addNewItem(ItemRequest itemRequest, List<MultipartFile> file,  UUID id);

}
