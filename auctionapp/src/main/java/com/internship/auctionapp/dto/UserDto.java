package com.internship.auctionapp.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.internship.auctionapp.entity.Bid;
import com.internship.auctionapp.entity.Item;
import com.internship.auctionapp.entity.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private UUID id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String profilePhotoUrl;
    private String phoneNumber;
    private String address;
    private String city;
    private String zip;
    private String country;
    private Set<Role> roles;
    private String stripeUserId;

}
