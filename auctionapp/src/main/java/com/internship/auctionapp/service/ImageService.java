package com.internship.auctionapp.service;

import com.internship.auctionapp.dto.ImageDto;

import java.util.List;
import java.util.UUID;

public interface ImageService {

    List<ImageDto> getImagesByItemId(UUID itemId);
}