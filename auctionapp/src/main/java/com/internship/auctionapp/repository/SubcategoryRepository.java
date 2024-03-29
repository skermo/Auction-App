package com.internship.auctionapp.repository;

import com.internship.auctionapp.entity.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SubcategoryRepository extends JpaRepository<Subcategory, UUID> {
    List<Subcategory> findAllByCategoryId(UUID categoryId);
    boolean existsById(UUID id);
}