package com.internship.auctionapp.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @NotBlank
    @Size(min = 2, message = "First name must contain at least 2 characters")
    @Size(max = 50, message = "First name cannot contain more than 50 characters")
    private String firstName;

    @NotBlank
    @Size(min = 2, message = "Last name must contain at least 2 characters")
    @Size(max = 50, message = "Last name cannot contain more than 50 characters")
    private String lastName;

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Invalid email format")
    @Size(max = 320, message = "Email cannot contain more than 320 characters")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 8, message = "Password must contain at least 8 characters")
    @Size(max = 255, message = "Password cannot contain more than 255 characters")
    private String password;
}
