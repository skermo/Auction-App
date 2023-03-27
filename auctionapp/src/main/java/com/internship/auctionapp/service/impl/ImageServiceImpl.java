package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.dto.ImageDto;
import com.internship.auctionapp.entity.Image;
import com.internship.auctionapp.repository.ImageRepository;
import com.internship.auctionapp.service.ImageService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ImageServiceImpl implements ImageService {
    private final ImageRepository imageRepository;
    private final ModelMapper mapper;
    TypeMap<Image, ImageDto> typeMapToDto;

    public ImageServiceImpl(ImageRepository imageRepository, ModelMapper mapper) {
        this.imageRepository = imageRepository;
        this.mapper = mapper;
        typeMapToDto = mapper.createTypeMap(Image.class, ImageDto.class);
    }

    @Override
    public List<ImageDto> getImagesByItemId(UUID itemId) {
        List<Image> images = imageRepository.findByItemId(itemId);
        return images.stream()
                .map(image -> mapToDto(image))
                .collect(Collectors.toList());

    }

    private ImageDto mapToDto(Image image) {
        if (typeMapToDto == null) {
            typeMapToDto.addMappings(mapper -> {
                mapper.map(src -> src.getItem().getId(), ImageDto::setItemId);
            });
        }
        ImageDto imageDto = mapper.map(image, ImageDto.class);
        return imageDto;
    }
}
