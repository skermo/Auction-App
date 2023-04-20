package com.internship.auctionapp.response;

import com.internship.auctionapp.dto.UserDto;
import com.internship.auctionapp.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthResponse {
    UserDto user;
    private String accessToken;
}
