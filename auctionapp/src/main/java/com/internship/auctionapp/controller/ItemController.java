package com.internship.auctionapp.controller;

import com.internship.auctionapp.dto.ItemDto;
import com.internship.auctionapp.service.ItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    //get all items rest api
    @GetMapping
    public List<ItemDto> getAllItems(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir
    ) {
        return itemService.getAllItems(pageNo, pageSize, sortBy, sortDir);
    }

    //get first product by availability
    @GetMapping("/first-by-availability")
    public ItemDto getFirstByAvailability() {
        ItemDto itemDto = itemService.getFirstItemByAvailability(java.time.LocalDateTime.now());
        return itemDto;
    }

}