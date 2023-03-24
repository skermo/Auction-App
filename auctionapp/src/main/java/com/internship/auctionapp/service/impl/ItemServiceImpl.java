package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.dto.ItemDto;
import com.internship.auctionapp.entity.Item;
import com.internship.auctionapp.repository.ItemRepository;
import com.internship.auctionapp.service.ItemService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final ModelMapper mapper;
    TypeMap<Item, ItemDto> typeMapToDto;

    public ItemServiceImpl(ItemRepository itemRepository, ModelMapper mapper) {
        this.itemRepository = itemRepository;
        this.mapper = mapper;
        typeMapToDto = mapper.createTypeMap(Item.class, ItemDto.class);
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
                .map(item -> mapToDto(item))
                .collect(Collectors.toList());
    }

    @Override
    public ItemDto getFirstAvailableItem() {
        LocalDateTime localDateTime = java.time.LocalDateTime.now();
        Item item = itemRepository.findFirstByEndDateGreaterThanEqualAndStartDateLessThanEqual(localDateTime, localDateTime);
        return mapToDto(item);
    }

    @Override
    public List<ItemDto> getAllAvailableItems(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        LocalDateTime localDateTime = java.time.LocalDateTime.now();
        Page<Item> items = itemRepository.findByEndDateGreaterThanEqualAndStartDateLessThanEqual(localDateTime, localDateTime, pageable);
        List<Item> itemList = items.getContent();
        return itemList.stream()
                .map(item -> mapToDto(item))
                .collect(Collectors.toList());
    }

    private ItemDto mapToDto(Item item) {
        if (typeMapToDto == null) {
            typeMapToDto.addMappings(mapper -> {
                mapper.map(src -> src.getCategory().getId(), ItemDto::setCategoryId);
                mapper.map(src -> src.getSubcategory().getId(), ItemDto::setSubcategoryId);
            });
        }
        ItemDto itemDto = mapper.map(item, ItemDto.class);
        return itemDto;
    }

}