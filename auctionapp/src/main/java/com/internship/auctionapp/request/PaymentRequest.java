package com.internship.auctionapp.request;

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
    @Size(min = 2, message = "Name must have at least 2 characters")
    @Size(max = 255, message = "Name cannot be longer than 255 characters")
    String cardHolderName;

    @NotEmpty
    @Size(min = 13, message = "Card number must have at least 13 characters")
    @Size(max = 19, message = "Card number cannot be longer than 19 characters")
    private String cardNumber;

    @NotEmpty
    private Date expirationDate;

    @Size(min = 3, message = "CVC must have at least 3 characters")
    @Size(max = 4, message = "CVC cannot be longer than 4 characters")
    @NotEmpty
    private String cvc;
}
