package com.internship.auctionapp.service;

import com.internship.auctionapp.request.LoginRequest;
import com.internship.auctionapp.request.RegisterRequest;
import com.internship.auctionapp.response.JwtAuthResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface AuthService {
    JwtAuthResponse login(LoginRequest loginRequest);

    JwtAuthResponse registration(RegisterRequest registerRequest);

    void logout(String request);

}
