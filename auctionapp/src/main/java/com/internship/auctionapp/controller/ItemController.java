package com.internship.auctionapp.controller;

import com.internship.auctionapp.dto.ItemDto;
import com.internship.auctionapp.request.ItemRequest;
import com.internship.auctionapp.response.ItemResponse;
import com.internship.auctionapp.service.ItemService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
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
            @RequestParam(value = "pageSize", defaultValue = "2", required = false) int pageSize) {
        return itemService.searchItems(name, category, pageNo, pageSize);
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

    @RequestMapping(value = "/{id}", method = RequestMethod.POST,
            consumes = {"multipart/form-data"})
    @PreAuthorize("#id == authentication.principal.id")
    public HttpStatus addNewItem(@PathVariable("id") UUID id, @RequestPart("document") ItemRequest document, @RequestPart("file") List<MultipartFile> file) {
        return itemService.addNewItem(document, file, id);
    }
}

