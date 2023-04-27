package com.internship.auctionapp.service;

import com.internship.auctionapp.dto.SubcategoryDto;

import java.util.List;
import java.util.UUID;

public interface SubcategoryService {
    List<SubcategoryDto> getAllSubcategories();
    List<SubcategoryDto> getSubcategoriesByCategoryId(UUID categoryId);
}