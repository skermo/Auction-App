package com.internship.auctionapp.service;

import com.internship.auctionapp.dto.ItemDto;
import com.internship.auctionapp.entity.Item;
import com.internship.auctionapp.request.ItemRequest;
import com.internship.auctionapp.request.PaymentRequest;
import com.internship.auctionapp.response.ItemResponse;
import com.internship.auctionapp.response.PaymentResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
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
    ItemResponse searchItems (String name, String category, int pageNo, int pageSize, String sortBy, String sortDir);
    List<ItemDto> getActiveSellerItems(UUID sellerId);
    List<ItemDto> getSoldSellerItems(UUID sellerId);
    List<ItemDto> getBiddedOnItemsByUser(UUID bidderId);
    ItemDto addNewItem(ItemRequest itemRequest, List<MultipartFile> files,  UUID id);

}
