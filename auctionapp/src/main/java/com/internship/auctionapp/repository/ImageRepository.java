package com.internship.auctionapp.repository;

import com.internship.auctionapp.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ImageRepository extends JpaRepository<Image, UUID> {
    List<Image> findByItemId(UUID itemId);

}