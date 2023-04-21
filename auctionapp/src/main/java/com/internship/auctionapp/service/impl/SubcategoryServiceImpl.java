package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.dto.SubcategoryDto;
import com.internship.auctionapp.entity.Subcategory;
import com.internship.auctionapp.repository.SubcategoryRepository;
import com.internship.auctionapp.service.SubcategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubcategoryServiceImpl implements SubcategoryService {

    private final SubcategoryRepository subcategoryRepository;
    private final ModelMapper mapper;


    public SubcategoryServiceImpl(SubcategoryRepository subcategoryRepository, ModelMapper mapper) {
        this.subcategoryRepository = subcategoryRepository;
        this.mapper = mapper;
    }

    @Override
    public List<SubcategoryDto> getAllSubcategories() {
        List<Subcategory> subcategories = subcategoryRepository.findAll();
        return subcategories.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private SubcategoryDto mapToDto(Subcategory subcategory) {
        return mapper.map(subcategory, SubcategoryDto.class);
    }

}