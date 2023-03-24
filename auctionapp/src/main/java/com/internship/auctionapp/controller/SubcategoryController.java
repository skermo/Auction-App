package com.internship.auctionapp.controller;

import com.internship.auctionapp.dto.SubcategoryDto;
import com.internship.auctionapp.service.SubcategoryService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}