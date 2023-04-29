package com.internship.auctionapp.repository;

import com.internship.auctionapp.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    boolean existsById(UUID id);
}