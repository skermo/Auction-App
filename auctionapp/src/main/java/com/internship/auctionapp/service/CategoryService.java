package com.internship.auctionapp.service;

import com.internship.auctionapp.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getAllCategories();
}