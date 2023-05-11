package com.internship.auctionapp.controller;

import com.internship.auctionapp.dto.ItemDto;
import com.internship.auctionapp.request.ItemRequest;
import com.internship.auctionapp.request.PaymentRequest;
import com.internship.auctionapp.response.ItemResponse;
import com.internship.auctionapp.response.PaymentResponse;
import com.internship.auctionapp.service.ItemService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public List<ItemDto> getAllItems(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir
    ) {
        return itemService.getAllItems(pageNo, pageSize, sortBy, sortDir);
    }

    @GetMapping("/first-available")
    public ItemDto getFirstAvailableItem() {
        return itemService.getFirstAvailableItem();
    }

    @GetMapping("/available")
    public Page<ItemDto> getAllAvailableItems(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir
    ) {
        return itemService.getAllAvailableItems(pageNo, pageSize, sortBy, sortDir);
    }

    @GetMapping("/{id}")
    public ItemDto getItemById(@PathVariable(name = "id") UUID id) {
        return itemService.getItemById(id);
    }

    @GetMapping("/search")
    public ItemResponse searchItems(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "2", required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = "name", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        return itemService.searchItems(name, category, pageNo, pageSize, sortBy, sortDir);
    }


    @GetMapping("/seller/active/{id}")
    @PreAuthorize("#id == authentication.principal.id")
    public List<ItemDto> getActiveSellerItems(@PathVariable(name = "id") UUID id) {
        return itemService.getActiveSellerItems(id);
    }

    @GetMapping("/seller/sold/{id}")
    @PreAuthorize("#id == authentication.principal.id")
    public List<ItemDto> getSoldSellerItems(@PathVariable(name = "id") UUID id) {
        return itemService.getSoldSellerItems(id);
    }

    @GetMapping("/seller/bids/{id}")
    @PreAuthorize("#id == authentication.principal.id")
    public List<ItemDto> getBiddedOnItemsByUser(@PathVariable(name = "id") UUID id) {
        return itemService.getBiddedOnItemsByUser(id);
    }

    @PostMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("#id == authentication.principal.id")
    public ItemDto addNewItem(@PathVariable("id") UUID id, @RequestPart("item") ItemRequest item, @RequestPart("files") List<MultipartFile> files) {
        return itemService.addNewItem(item, files, id);
    }

    @GetMapping("/recommendations/{id}")
    @PreAuthorize("#id == authentication.principal.id")
    public List<ItemDto> getRecommendedItems(@PathVariable("id") UUID id){
        return itemService.getRecommendedItems(id);
    }

}

