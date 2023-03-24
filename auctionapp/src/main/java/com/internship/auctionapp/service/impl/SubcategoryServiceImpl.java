package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.dto.SubcategoryDto;
import com.internship.auctionapp.entity.Subcategory;
import com.internship.auctionapp.repository.SubcategoryRepository;
import com.internship.auctionapp.service.SubcategoryService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubcategoryServiceImpl implements SubcategoryService {

    private final SubcategoryRepository subcategoryRepository;
    private final ModelMapper mapper;
    TypeMap<Subcategory, SubcategoryDto> typeMapToDto;


    public SubcategoryServiceImpl(SubcategoryRepository subcategoryRepository, ModelMapper mapper) {
        this.subcategoryRepository = subcategoryRepository;
        this.mapper = mapper;
        typeMapToDto = mapper.createTypeMap(Subcategory.class, SubcategoryDto.class);
    }

    @Override
    public List<SubcategoryDto> getAllSubcategories() {
        List<Subcategory> subcategories = subcategoryRepository.findAll();
        return subcategories.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private SubcategoryDto mapToDto(Subcategory subcategory) {
        if (typeMapToDto == null) {
            typeMapToDto.addMappings(mapper -> {
                mapper.map(src -> src.getCategory().getId(), SubcategoryDto::setCategoryId);
            });
        }
        return mapper.map(subcategory, SubcategoryDto.class);
    }

}