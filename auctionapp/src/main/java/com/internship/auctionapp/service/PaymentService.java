package com.internship.auctionapp.service;

import com.internship.auctionapp.request.PaymentRequest;
import com.internship.auctionapp.response.PaymentResponse;

public interface PaymentService {
    PaymentResponse pay(PaymentRequest paymentRequest);
}
