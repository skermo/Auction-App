package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.aws.FileStore;
import com.internship.auctionapp.aws.bucket.BucketName;
import com.internship.auctionapp.dto.ItemDto;
import com.internship.auctionapp.entity.Bid;
import com.internship.auctionapp.entity.Image;
import com.internship.auctionapp.entity.Item;
import com.internship.auctionapp.entity.User;
import com.internship.auctionapp.exception.BadRequestException;
import com.internship.auctionapp.repository.*;
import com.internship.auctionapp.request.ItemRequest;
import com.internship.auctionapp.response.ItemResponse;
import com.internship.auctionapp.service.ItemService;
import com.internship.auctionapp.service.PaymentService;
import com.internship.auctionapp.util.StringComparison;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.entity.ContentType;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ItemServiceImpl.class);
    private final ItemRepository itemRepository;
    private final BidRepository bidRepository;
    private final CategoryRepository categoryRepository;
    private final SubcategoryRepository subcategoryRepository;
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;
    private final ShipmentRepository shipmentRepository;
    private final PaymentService paymentService;
    private final ModelMapper mapper;
    private final FileStore fileStore;

    public ItemServiceImpl(ItemRepository itemRepository, ModelMapper mapper, BidRepository bidRepository, CategoryRepository categoryRepository, SubcategoryRepository subcategoryRepository, UserRepository userRepository, ImageRepository imageRepository, ShipmentRepository shipmentRepository, PaymentService paymentService, FileStore fileStore) {
        this.itemRepository = itemRepository;
        this.mapper = mapper;
        this.bidRepository = bidRepository;
        this.categoryRepository = categoryRepository;
        this.subcategoryRepository = subcategoryRepository;
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
        this.shipmentRepository = shipmentRepository;
        this.paymentService = paymentService;
        this.fileStore = fileStore;
    }

    @Override
    public List<ItemDto> getAllItems(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Item> items = itemRepository.findAll(pageable);
        List<Item> itemList = items.getContent();
        return itemList.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ItemDto getFirstAvailableItem() {
        LocalDateTime localDateTime = java.time.LocalDateTime.now();
        Item item = itemRepository.findFirstByEndDateGreaterThanEqualAndStartDateLessThanEqual(localDateTime, localDateTime);
        return mapToDto(item);
    }

    @Override
    public Page<ItemDto> getAllAvailableItems(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        LocalDateTime localDateTime = java.time.LocalDateTime.now();
        Page<Item> items = itemRepository.findByEndDateGreaterThanEqualAndStartDateLessThanEqual(localDateTime, localDateTime, pageable);
        return items.map(this::mapToDto);
    }


    @Override
    public ItemDto getItemById(UUID id) {
        return mapToDto(itemRepository.findById(id).get());
    }

    @Override
    public ItemResponse searchItems(String name, String category, int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Item> items = itemRepository.searchItems(name, category, pageable);
        String didYouMean = "";
        if (items.isEmpty() && !StringUtils.isEmpty(name)) {
            List<String> itemNames = itemRepository.findAllNames();
            didYouMean = StringComparison
                    .getSuggestedName(name, itemNames)
                    .orElse("");
        }
        return new ItemResponse(
                items.map(this::mapToDto), didYouMean);
    }

    @Override
    public List<ItemDto> getActiveSellerItems(UUID sellerId) {
        LocalDateTime localDateTime = java.time.LocalDateTime.now();
        List<Item> items = itemRepository
                .findByEndDateGreaterThanEqualAndStartDateLessThanEqualAndSeller_Id(
                        localDateTime,
                        localDateTime,
                        sellerId
                );
        return items.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ItemDto> getSoldSellerItems(UUID sellerId) {
        List<Item> items = itemRepository.findSoldItemsByUser(sellerId);
        return items.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ItemDto> getBiddedOnItemsByUser(UUID bidderId) {
        List<Bid> bids = bidRepository.findAllByUser(bidderId);
        List<Item> items = new ArrayList<>();
        for (Bid bid : bids) {
            Item item = itemRepository.findById(bid.getItem().getId()).orElse(null);
            if (item != null) {
                item.setStartPrice(bid.getAmount());
                items.add(item);
            }
        }
        return items.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ItemDto addNewItem(ItemRequest itemRequest, List<MultipartFile> files, UUID id) {
        checkItemRequestValidity(itemRequest, id);
        Item item = mapItemRequestToItem(itemRequest, id);

        List<String> imageNames = uploadPhotos(id, item.getId(), files);
        List<Image> images = new ArrayList<>();
        try {
            for (String imageName : imageNames) {
                Image image = new Image();
                image.setUrl(imageName);
                image.setItem(item);
                images.add(image);
            }
            item.setImages(images);

            updateUserInfo(itemRequest, id);
            itemRepository.save(item);
            LOGGER.info("Successfully saved item " + item.getId() + " to seller " + item.getSeller().getId());
        } catch (BadRequestException exception) {
            LOGGER.error("Could not save item " + item.getName() + " to seller " + item.getSeller().getId());
            throw new BadRequestException("Could not save item");
        }
        return mapToDto(item);
    }

    @Override
    public List<ItemDto> getRecommendedItems(UUID userId) {
        List<Item> interestedIn = itemRepository.findItemsUserIsInterestedIn(userId);
        List<Item> finalItems = new ArrayList<>();

        if (interestedIn.size() == 0) {
            return new ArrayList<>();
        }

        Map<UUID, Integer> recommendedCategories = new HashMap<>();
        List<Double> listOfPrices = new ArrayList<>();

        getRecommendedCategoriesAndAvgPrices(interestedIn, listOfPrices, recommendedCategories);

        Map<UUID, Integer> sortedCategories = sortMap(recommendedCategories);

        finalItems = getItemsRecommendedByCategory(sortedCategories, userId);

        if (finalItems.size() >= 3) {
            return finalItems.stream()
                    .limit(3)
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        }

        double avgPrice = calculateListAverage(listOfPrices);

        finalItems.addAll(getItemsRecommendedByPrice(userId, avgPrice));

        if (finalItems.size() >= 3) {
            return finalItems.stream()
                    .limit(3)
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        }

        return new ArrayList<>();
    }

    private List<Item> getItemsRecommendedByPrice(UUID userId, double avgPrice) {
        return itemRepository.findRecommendedItemsByPrice(userId, avgPrice);
    }

    private double calculateListAverage(List<Double> list) {
        double sum = 0;
        for (Double listOfPrice : list) {
            sum = sum + listOfPrice;
        }
        return sum / list.size();
    }

    private List<Item> getItemsRecommendedByCategory(Map<UUID, Integer> categories, UUID userId) {
        List<Item> items = new ArrayList<>();
        for (UUID id : categories.keySet()) {
            List<Item> itemsByCategory = itemRepository.findRecommendedItemsByCategory(userId, id);
            items.addAll(itemsByCategory);
            if (items.size() >= 3) {
                return items;
            }
        }
        return items;
    }

    private Map<UUID, Integer> sortMap(Map<UUID, Integer> map) {
        return map.entrySet().stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .collect(Collectors.toMap(
                        Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
    }

    private void getRecommendedCategoriesAndAvgPrices(List<Item> interestedIn, List<Double> listOfPrices, Map<UUID, Integer> recommendedCategories) {
        for (Item item : interestedIn) {
            if (!recommendedCategories.containsKey(item.getCategory().getId())) {
                recommendedCategories
                        .put(item.getCategory().getId(), 1);
            } else {
                recommendedCategories
                        .computeIfPresent(item.getCategory().getId(), (k, v) -> v + 1);
            }
            listOfPrices.add(item.getStartPrice());
        }
    }

    private void updateUserInfo(ItemRequest itemRequest, UUID id) {
        User user = userRepository.findById(id).get();
        user.setAddress(itemRequest.getAddress());
        user.setCity(itemRequest.getCity());
        user.setZip(itemRequest.getZip());
        user.setCountry(itemRequest.getCountry());
        user.setPhoneNumber(itemRequest.getPhoneNumber());
        userRepository.save(user);
    }

    private Item mapItemRequestToItem(ItemRequest itemRequest, UUID sellerId) {
        return Item.builder()
                .name(itemRequest.getName())
                .startPrice(itemRequest.getStartPrice())
                .startDate(itemRequest.getStartDate())
                .endDate(itemRequest.getEndDate())
                .description(itemRequest.getDescription())
                .noBids(0)
                .category(categoryRepository.findById(itemRequest.getCategoryId()).get())
                .subcategory(subcategoryRepository.findById(itemRequest.getSubcategoryId()).get())
                .seller(userRepository.findById(sellerId).get())
                .build();
    }

    private List<String> uploadPhotos(UUID sellerId, UUID itemId, List<MultipartFile> files) {
        checkFilesValidity(files);
        List<String> imageNames = new ArrayList<>();
        for (MultipartFile file : files) {
            if (!Arrays.asList(ContentType.IMAGE_JPEG.getMimeType(),
                    ContentType.IMAGE_PNG.getMimeType()).contains(file.getContentType())) {
                throw new BadRequestException("File must be an image " + file.getContentType());
            }
            Map<String, String> metadata = new HashMap<>();
            metadata.put("Content-Type", file.getContentType());
            metadata.put("Content-Length", String.valueOf(file.getSize()));
            String path = String.format("%s/%s", BucketName.AUCTION_APP_IMAGES.getBucketName(), sellerId);
            String name = String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());
            try {
                fileStore.save(path, name, Optional.of(metadata), file.getInputStream());
                imageNames.add(name);
            } catch (IOException e) {
                throw new BadRequestException("Could not save images");
            }
        }
        return imageNames;
    }

    private void checkFilesValidity(List<MultipartFile> files) {
        if (files.isEmpty()) {
            throw new BadRequestException("Cannot upload empty file");
        }
        if (files.size() < 3) {
            throw new BadRequestException("Must upload at least 3 photos");
        }
    }

    private void checkItemRequestValidity(ItemRequest itemRequest, UUID id) {
        if (itemRequest.getStartDate().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Start Date cannot be in the past");
        }
        if (itemRequest.getEndDate().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("End Date cannot be in the past");
        }
        if (itemRequest.getEndDate().isBefore(itemRequest.getStartDate())) {
            throw new BadRequestException("End Date cannot be before Start Date");
        }
        if (!categoryRepository.existsById(itemRequest.getCategoryId())) {
            throw new BadRequestException("Category doesn't exist");
        }
        if (!subcategoryRepository.existsById(itemRequest.getSubcategoryId())) {
            throw new BadRequestException("Subcategory doesn't exist");
        }
        if (!userRepository.existsById(id)) {
            throw new BadRequestException("User doesn't exist");
        }
    }

    private ItemDto mapToDto(Item item) {
        return mapper.map(item, ItemDto.class);
    }

}
