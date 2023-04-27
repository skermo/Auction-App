package com.internship.auctionapp.controller;

import com.internship.auctionapp.request.LoginRequest;
import com.internship.auctionapp.request.RegisterRequest;
import com.internship.auctionapp.response.JwtAuthResponse;
import com.internship.auctionapp.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginRequest loginRequest) {
        JwtAuthResponse jwtAuthResponse = authService.login(loginRequest);
        return ResponseEntity.ok(jwtAuthResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<JwtAuthResponse> register(@RequestBody RegisterRequest registerRequest) {
        JwtAuthResponse jwtAuthResponse = authService.registration(registerRequest);
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.CREATED);
    }

    @GetMapping("/logout")
    public void logout(@RequestHeader(name = "Authorization") String request) {
        authService.logout(request);
    }

    @PostMapping(path = "/{id}/image/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void uploadProfilePhoto(@PathVariable("id") UUID id,
                                   @RequestParam("file") MultipartFile file) {
        authService.uploadProfilePhoto(id, file);
    }
    @GetMapping("/{id}/image/download")
    public byte[] downloadProfilePhoto(@PathVariable("id") UUID id){
        return authService.downloadProfilePhoto(id);
    }
}
