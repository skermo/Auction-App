package com.internship.auctionapp.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemRequest {

    @NotEmpty(message = "Name cannot be empty")
    @Size(min = 2, message = "Name must contain at least 2 characters")
    private String name;

    @Positive
    @NotEmpty(message = "Start Price cannot be empty")
    private double startPrice;

    @NotEmpty(message = "Start Date cannot be empty")
    private LocalDateTime startDate;

    @NotEmpty(message = "End Date cannot be empty")
    private LocalDateTime endDate;

    @Size(min = 2, message = "Description must contain at least 2 characters")
    @NotEmpty(message = "Description cannot be empty")
    private String description;

    @NotEmpty(message = "Category cannot be empty")
    private UUID categoryId;

    @NotEmpty(message = "Subcategory cannot be empty")
    private UUID subcategoryId;

    @NotEmpty(message = "Address cannot be empty")
    @Size(min = 2, message = "Address must contain at least 2 characters")
    private String address;

    @NotEmpty(message = "City cannot be empty")
    @Size(min = 2, message = "City must contain at least 2 characters")
    private String city;

    @NotEmpty(message = "Zip cannot be empty")
    @Size(min = 5, message = "Zip must contain at least 5 characters")
    private String zip;

    @NotEmpty(message = "Country cannot be empty")
    @Size(min = 2, message = "Country must contain at least 2 characters")
    private String country;

    @NotEmpty(message = "Phone Number cannot be empty")
    @Size(min = 2, message = "Phone Number must contain at least 2 characters")
    private String phoneNumber;
}
