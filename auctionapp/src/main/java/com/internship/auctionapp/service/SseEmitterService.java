package com.internship.auctionapp.service;

import com.internship.auctionapp.dto.BidDto;
import com.internship.auctionapp.dto.NotificationDto;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SseEmitterService {
    void addSseEmitter(SseEmitter sseEmitter);
    <T> void notify(T element, String eventName);
}
