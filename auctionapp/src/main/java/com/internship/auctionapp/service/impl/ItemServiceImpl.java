package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.dto.ItemDto;
import com.internship.auctionapp.dto.ItemResponse;
import com.internship.auctionapp.entity.Item;
import com.internship.auctionapp.repository.ItemRepository;
import com.internship.auctionapp.service.ItemService;
import com.internship.auctionapp.util.StringComparison;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
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
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ItemDto getFirstAvailableItem() {
        LocalDateTime localDateTime = java.time.LocalDateTime.now();
        Item item = itemRepository.findFirstByEndDateGreaterThanEqualAndStartDateLessThanEqual(localDateTime, localDateTime);
        return mapToDto(item);
    }

    @Override
    public ItemResponse getAllAvailableItems(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        LocalDateTime localDateTime = java.time.LocalDateTime.now();
        Page<Item> items = itemRepository.findByEndDateGreaterThanEqualAndStartDateLessThanEqual(localDateTime, localDateTime, pageable);
        return getItemResponse(items, "");
    }


    @Override
    public ItemDto getItemById(UUID id) {
       return mapToDto(itemRepository.findById(id).get());
    }

    @Override
    public ItemResponse searchItems(String name, String category, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Item> items = itemRepository.searchItems(name, category, pageable);
        String didYouMean = "";
        if(items.isEmpty() && name != ""){
            LocalDateTime localDateTime = java.time.LocalDateTime.now();
            List<Item> itemList = itemRepository.findByEndDateGreaterThanEqualAndStartDateLessThanEqual(localDateTime, localDateTime);
            int distance = Integer.MAX_VALUE;
            for (Item item : itemList) {
                int newDistance;
                String[] parts = item.getName().split(" ");
                for (String part : parts) {
                    newDistance = StringComparison.calculate(part, name);
                    if (newDistance < distance) {
                        distance = newDistance;
                        didYouMean = part;
                    }
                }
            }
            if(distance <= 10 && distance > 0){
                return  getItemResponse(items, didYouMean);
            }
        }return getItemResponse(items, "");
    }

    private ItemResponse getItemResponse(Page<Item> items, String didYouMean) {
        List<Item> itemList = items.getContent();
        List<ItemDto> content = itemList.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
        ItemResponse itemResponse = new ItemResponse();
        itemResponse.setContent(content);
        itemResponse.setPageNo(items.getNumber());
        itemResponse.setPageSize(items.getSize());
        itemResponse.setTotalElements(items.getTotalElements());
        itemResponse.setLast(items.isLast());
        itemResponse.setDidYouMean(didYouMean);

        return itemResponse;
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
