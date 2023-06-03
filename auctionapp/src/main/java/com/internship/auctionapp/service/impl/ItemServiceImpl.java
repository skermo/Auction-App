package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.aws.FileStore;
import com.internship.auctionapp.aws.bucket.BucketName;
import com.internship.auctionapp.dto.ItemDto;
import com.internship.auctionapp.entity.*;
import com.internship.auctionapp.exception.BadRequestException;
import com.internship.auctionapp.exception.ConflictException;
import com.internship.auctionapp.exception.NotFoundException;
import com.internship.auctionapp.helpers.ImageToUpload;
import com.internship.auctionapp.repository.*;
import com.internship.auctionapp.request.ItemRequest;
import com.internship.auctionapp.response.ItemResponse;
import com.internship.auctionapp.response.ValidateCSVResponse;
import com.internship.auctionapp.service.ItemService;
import com.internship.auctionapp.util.StringComparison;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.entity.ContentType;
import org.modelmapper.ModelMapper;
import org.modelmapper.internal.util.Iterables;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;
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
    private final ModelMapper mapper;
    private final FileStore fileStore;

    public ItemServiceImpl(ItemRepository itemRepository, ModelMapper mapper, BidRepository bidRepository, CategoryRepository categoryRepository, SubcategoryRepository subcategoryRepository, UserRepository userRepository, FileStore fileStore) {
        this.itemRepository = itemRepository;
        this.mapper = mapper;
        this.bidRepository = bidRepository;
        this.categoryRepository = categoryRepository;
        this.subcategoryRepository = subcategoryRepository;
        this.userRepository = userRepository;
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
        ZonedDateTime now = java.time.ZonedDateTime.now();
        Item item = itemRepository.findFirstByEndDateGreaterThanEqualAndStartDateLessThanEqual(now, now);
        return mapToDto(item);
    }

    @Override
    public Page<ItemDto> getAllAvailableItems(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        ZonedDateTime now = java.time.ZonedDateTime.now();
        Page<Item> items = itemRepository.findByEndDateGreaterThanEqualAndStartDateLessThanEqual(now, now, pageable);
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
        ZonedDateTime now = java.time.ZonedDateTime.now();
        List<Item> items = itemRepository
                .findByEndDateGreaterThanEqualAndStartDateLessThanEqualAndSeller_Id(
                        now,
                        now,
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
        List<Item> finalItems;

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

    @Override
    public List<ValidateCSVResponse> addNewItemCSV(MultipartFile file, UUID userId) {
        List<ValidateCSVResponse> responses = new ArrayList<>();
        if (!hasCSVFormat(file)){
            throw new BadRequestException("File not a csv.");
        }

        List<Item> items = csvToItems(file, userId, responses);
        if(items == null){
            return responses;
        }
        itemRepository.saveAll(items);
        return responses;
    }

    private boolean validateCSVHeader(String header, List<ValidateCSVResponse> responses, List<String> expectedHeaders) {
        boolean hasNoerrors = true;
        try {
            if (Objects.isNull(header)) {
                responses.add(new ValidateCSVResponse(0, "", "The file has no headers."));
                LOGGER.error("The CSV file has no headers");
                return false;
            }
            List<String> headersInFileList;
            String[] headersInFileArray;
            if (header.contains(",")) {
                headersInFileArray = StringUtils.split(header, ",");
                headersInFileList = Arrays.asList(headersInFileArray);
            } else {
                responses.add(new ValidateCSVResponse(0, "", "The file has only one header."));
                LOGGER.error("The file has only one header");
                return false;
            }
            for (String expectedHeader : expectedHeaders) {
                if (!headersInFileList.contains(expectedHeader)) {
                    responses.add(new ValidateCSVResponse(0, expectedHeader, "Header " + expectedHeader + " is not present."));
                    hasNoerrors = false;
                    LOGGER.error("Header " + expectedHeader + " is not present");
                }
            }
            return hasNoerrors;
        } catch (Exception e) {
            throw new BadRequestException("Could not validate CSV headers: " + e);
        }
    }

    private boolean hasCSVFormat(MultipartFile file) {
        return "text/csv".equals(file.getContentType());
    }


    private List<Item> csvToItems(MultipartFile file, UUID userId, List<ValidateCSVResponse> responses) {
        String header;
        Iterable<CSVRecord> csvRecords;
        try {
            BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
            CSVParser csvParser = new CSVParser(fileReader,
                    CSVFormat.DEFAULT
                            .withFirstRecordAsHeader()
                            .withIgnoreHeaderCase()
                            .withTrim());
            csvRecords = csvParser.getRecords();
            header = getHeaderCSV(file.getInputStream());
        } catch (IOException e) {
            responses.add(new ValidateCSVResponse(0, "", "Unable to parse CSV file: " + e.getMessage()));
            LOGGER.error("Unable to parse CSV file: " + e.getMessage());
            return null;
        }

        List<String> expectedHeader = Arrays
                .asList("name", "startPrice", "startDate", "endDate", "description", "category", "subcategory", "images");
        boolean headerErrors = validateCSVHeader(header, responses, expectedHeader);
        if (!headerErrors) {
            return null;
        }

        User seller = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));

        if (Iterables.getLength(csvRecords) == 0) {
            responses.add(new ValidateCSVResponse(0, "", "CSV is empty"));
            LOGGER.error("CSV is empty");
            return null;
        }

        List<Item> items = new ArrayList<>();
        int i = 1;
        for (CSVRecord csvRecord : csvRecords) {
            Item item = new Item();
            try {
                item.setName(csvRecord.get("name"));
            } catch (Exception e) {
                responses.add(new ValidateCSVResponse(i, "name", e.getMessage()));
                LOGGER.error("Error at field name in line " + i + ": " + e.getMessage());
            }
            try {
                item.setStartPrice(Double.parseDouble(csvRecord.get("startPrice")));
            } catch (Exception e) {
                responses.add(new ValidateCSVResponse(i, "startPrice", e.getMessage()));
                LOGGER.error("Error at field startPrice in line " + i + ": " + e.getMessage());
            }
            try {
                item.setStartDate(ZonedDateTime.parse(csvRecord.get("startDate")));
                if (item.getStartDate().isBefore(ZonedDateTime.now())) {
                    responses.add(new ValidateCSVResponse(i, "startDate", "Start Date cannot be before today."));
                    LOGGER.error("Field startDate in line " + i + " cannot be before today.");
                }
            } catch (Exception e) {
                responses.add(new ValidateCSVResponse(i, "startDate", e.getMessage()));
                LOGGER.error("Error at field startDate in line " + i + ": " + e.getMessage());
            }
            try {
                item.setEndDate(ZonedDateTime.parse(csvRecord.get("endDate")));
                if (item.getEndDate().isBefore(ZonedDateTime.now())) {
                    responses.add(new ValidateCSVResponse(i, "endDate", "End Date cannot be before today."));
                    LOGGER.error("Field endDate in line " + i + " cannot be before today.");
                }
                if (item.getEndDate().isBefore(item.getStartDate())) {
                    responses.add(new ValidateCSVResponse(i, "endDate", "End Date cannot be before Start Date."));
                    LOGGER.error("Field endDate in line " + i + " cannot be before startDate.");
                }
            } catch (Exception e) {
                responses.add(new ValidateCSVResponse(i, "endDate", e.getMessage()));
                LOGGER.error("Error at field endDate in line " + i + ": " + e.getMessage());
            }
            try {
                item.setDescription(csvRecord.get("description"));
            } catch (Exception e) {
                responses.add(new ValidateCSVResponse(i, "description", e.getMessage()));
                LOGGER.error("Error at field name in description " + i + ": " + e.getMessage());
            }
            item.setNoBids(0);
            item.setSeller(seller);
            try {
                item.setCategory(findCategoryIdByName(csvRecord.get("category")));
            } catch (Exception e) {
                responses.add(new ValidateCSVResponse(i, "category", e.getMessage()));
                LOGGER.error("Error at field category in line " + i + ": " + e.getMessage());
            }
            try {
                item.setSubcategory(findSubcategoryByNameAndCategoryId(
                        item.getCategory().getId(),
                        csvRecord.get("subcategory")));
            } catch (Exception e) {
                responses.add(new ValidateCSVResponse(i, "subcategory", e.getMessage()));
                LOGGER.error("Error at field subcategory in line " + i + ": " + e.getMessage());
            }
            i++;
            List<ImageToUpload> inputStreams = checkImagesValidity(csvRecord.get("images"), userId, responses, i);
            if (responses.size() == 0) {
                List<String> imageNames = uploadImageByUrl(inputStreams);
                List<Image> images = new ArrayList<>();
                for (String imageName : imageNames) {
                    Image image = new Image();
                    image.setUrl(imageName);
                    image.setItem(item);
                    images.add(image);
                }
                item.setImages(images);
            }
            items.add(item);
        }
        return items;
    }

    private String getHeaderCSV(InputStream inputStream) {
        try {
            return new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8)).readLine();
        } catch (IOException e) {
            throw new BadRequestException("Unable to parse CSV");
        }
    }

    private Category findCategoryIdByName(String categoryName) {
        List<Category> categories = categoryRepository.findAll();
        for (Category category : categories) {
            if (category.getName().equalsIgnoreCase(categoryName)) return category;
        }
        throw new BadRequestException("Invalid category name");
    }

    private Subcategory findSubcategoryByNameAndCategoryId(UUID categoryId, String subcategoryName) {
        List<Subcategory> subcategories = subcategoryRepository.findAllByCategoryId(categoryId);
        for (Subcategory subcategory : subcategories) {
            if (subcategory.getName().equalsIgnoreCase(subcategoryName)) return subcategory;
        }
        throw new BadRequestException("Invalid subcategory name");
    }

    private List<ImageToUpload> checkImagesValidity(String images, UUID userId, List<ValidateCSVResponse> responses, int line) {
        String[] splitImages = images.trim().split("\\s+");
        if (splitImages.length < 3 || splitImages.length > 10) {
            responses.add(new ValidateCSVResponse(line, "images", "Must upload between 3 and 10 images per product"));
            LOGGER.error("Error at field images in line " + line + ": Must upload between 3 and 10 images.");
        }
        List<ImageToUpload> imagesToUpload = new ArrayList<>();
        for (String image : splitImages) {
            InputStream inputStream = null;
            try {
                ImageIO.read(new URL(image));
                inputStream = new URL(image).openStream();
            } catch (Exception e) {
                responses.add(new ValidateCSVResponse(line, "images", "Invalid image url: " + image));
                LOGGER.error("Error at field images in line " + line + ": Invalid URL " + image);
            }
            String format = null;
            if (inputStream != null) {
                try (ImageInputStream imageInputStream = ImageIO.createImageInputStream(inputStream)) {
                    Iterator<ImageReader> readers = ImageIO.getImageReaders(imageInputStream);
                    if (readers.hasNext()) {
                        ImageReader reader = readers.next();
                        format = reader.getFormatName();
                        reader.setInput(imageInputStream);
                        if (!(format.equalsIgnoreCase("JPEG") || format.equalsIgnoreCase("PNG"))) {
                            responses.add(new ValidateCSVResponse(line, "images", "Image must be JPEG or PNG:  " + image));
                            LOGGER.error("Error at field images in line " + line + ": Image must be JPEG or PNG " + image);
                        }
                    }
                    ImageToUpload imageToUpload = new ImageToUpload(
                            inputStream, String.format("%s/%s", BucketName.AUCTION_APP_IMAGES.getBucketName(), userId),
                            String.format("%s-%s", userId, UUID.randomUUID()), format);
                    imagesToUpload.add(imageToUpload);
                } catch (IOException e) {
                    throw new BadRequestException("Unable to get image: " + e);
                }
            }
        }
        return imagesToUpload;
    }

    private List<String> uploadImageByUrl(List<ImageToUpload> inputStreams) {
        try {
            List<String> imageNames = new ArrayList<>();
            for (ImageToUpload inputStream : inputStreams) {
                Map<String, String> metadata = new HashMap<>();
                metadata.put("Content-Type", inputStream.getContentType());
                fileStore.save(
                        inputStream.getPath(), inputStream.getFileName(),
                        Optional.of(metadata), inputStream.getInputStream()
                );
                imageNames.add(inputStream.getFileName());
            }
            return imageNames;
        } catch (Exception e) {
            throw new ConflictException("Unable to upload images");
        }
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
        if (itemRequest.getStartDate().isBefore(ZonedDateTime.now())) {
            throw new BadRequestException("Start Date cannot be in the past");
        }
        if (itemRequest.getEndDate().isBefore(ZonedDateTime.now())) {
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
