package com.internship.auctionapp.controller;

import com.internship.auctionapp.dto.ImageDto;
import com.internship.auctionapp.service.ImageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/images")
public class ImageController {
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    // get all images rest api
    @GetMapping
    public List<ImageDto> getAllImages() {
        return imageService.getAllImages();
    }

    // get images by itemId
    @GetMapping("/{itemId}")
    public List<ImageDto> getImagesByItemId(@PathVariable(name = "itemId") UUID itemId) {
        return imageService.getImagesByItemId(itemId);
    }
}