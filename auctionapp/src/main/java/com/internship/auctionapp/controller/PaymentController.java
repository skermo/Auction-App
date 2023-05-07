package com.internship.auctionapp.controller;

import com.internship.auctionapp.request.PaymentRequest;
import com.internship.auctionapp.response.PaymentResponse;
import com.internship.auctionapp.service.PaymentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority(T(com.internship.auctionapp.enums.UserRole).USER, " +
            "T(com.internship.auctionapp.enums.UserRole).ADMIN)")
    public PaymentResponse buyItem(@RequestBody PaymentRequest paymentRequest) {
        return paymentService.pay(paymentRequest);
    }
}
