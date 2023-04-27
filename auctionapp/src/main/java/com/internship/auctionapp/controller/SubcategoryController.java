package com.internship.auctionapp.controller;

import com.internship.auctionapp.dto.SubcategoryDto;
import com.internship.auctionapp.service.SubcategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/subcategories")
public class SubcategoryController {

    private final SubcategoryService subcategoryService;

    public SubcategoryController(SubcategoryService subcategoryService) {
        this.subcategoryService = subcategoryService;
    }

    @GetMapping
    public List<SubcategoryDto> getAllSubcategories() {
        return subcategoryService.getAllSubcategories();
    }
    @GetMapping("/category/{categoryId}")
    public List<SubcategoryDto> getSubcategoriesByCategoryId(@PathVariable(name = "categoryId") UUID categoryId){
        return subcategoryService.getSubcategoriesByCategoryId(categoryId);
    }
}