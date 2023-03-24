package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.dto.CategoryDto;
import com.internship.auctionapp.entity.Category;
import com.internship.auctionapp.repository.CategoryRepository;
import com.internship.auctionapp.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper mapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, ModelMapper mapper) {
        this.categoryRepository = categoryRepository;
        this.mapper = mapper;
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(category -> mapToDto(category))
                .collect(Collectors.toList());
    }

    private CategoryDto mapToDto(Category category) {
        CategoryDto categoryDto = mapper.map(category, CategoryDto.class);
        return categoryDto;
    }

}