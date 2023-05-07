package com.internship.auctionapp.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequest {

    @NotEmpty
    private UUID itemId;

    @NotEmpty
    private UUID userId;

    @NotEmpty
    @Min(value = 1, message = "Amount cannot be less than 1")
    @Max(value = 1000000, message = "Amount cannot be more than 1000000")
    private double amount;

    @NotEmpty
    @Size(min = 2, message = "Name must have at least 2 characters")
    @Size(max = 255, message = "Name cannot be longer than 255 characters")
    String cardHolderName;

    @NotEmpty
    @Size(min = 13, message = "Card number must have at least 13 characters")
    @Size(max = 19, message = "Card number cannot be longer than 19 characters")
    private String cardNumber;

    @NotEmpty
    @Min(value = 1, message = "Expiration month cannot be less than 1")
    @Max(value = 12, message = "Expiration month cannot be more than 12")
    private int expirationMonth;

    @NotEmpty
    @Min(value = 2022, message = "Expiration year cannot be less than 2022")
    @Max(value = 9999, message = "Expiration month cannot be more than 9999")
    private int expirationYear;

    @Size(min = 3, message = "CVC must have at least 3 characters")
    @Size(max = 4, message = "CVC cannot be longer than 4 characters")
    @NotEmpty
    private String cvc;

    @NotEmpty
    @Size(min = 2, message = "Address must have at least 2 characters")
    @Size(max = 255, message = "Address cannot be longer than 255 characters")
    private String address;

    @NotEmpty
    @Size(min = 2, message = "City must have at least 2 characters")
    @Size(max = 255, message = "City cannot be longer than 255 characters")
    private String city;

    @NotEmpty
    @Size(min = 5, message = "Zip number must have at least 5 characters")
    @Size(max = 5, message = "Zip number cannot be longer than 5 characters")
    private String zip;

    @NotEmpty
    @Size(min = 2, message = "Country must have at least 13 characters")
    @Size(max = 255, message = "Country cannot be longer than 19 characters")
    private String country;
}
