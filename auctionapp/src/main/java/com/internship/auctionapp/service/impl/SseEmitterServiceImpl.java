package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.dto.BidDto;
import com.internship.auctionapp.dto.NotificationDto;
import com.internship.auctionapp.service.SseEmitterService;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class SseEmitterServiceImpl implements SseEmitterService {

    private final CopyOnWriteArrayList<SseEmitter> sseEmitters = new CopyOnWriteArrayList<>();

    @Override
    public void addSseEmitter(SseEmitter sseEmitter) {
        sseEmitter.onCompletion(() -> sseEmitters.remove(sseEmitter));
        sseEmitter.onTimeout(() -> sseEmitters.remove(sseEmitter));
        sseEmitters.add(sseEmitter);
    }

    @Override
    public void publishNotification(NotificationDto notificationDto) {
        List<SseEmitter> deadSseEmitters = new ArrayList<>();
        sseEmitters.forEach(sseEmitter -> {
            try {
                sseEmitter.send(
                        SseEmitter.event()
                                .name(notificationDto.getUserId().toString())
                                .data(notificationDto)
                );
            } catch (Exception e) {
                deadSseEmitters.add(sseEmitter);
            }
        });
        sseEmitters.removeAll(deadSseEmitters);
    }

    @Override
    public void publishBidUpdate(BidDto bidDto) {
        List<SseEmitter> deadSseEmitters = new ArrayList<>();
        sseEmitters.forEach(sseEmitter -> {
            try {
                sseEmitter.send(
                        SseEmitter.event()
                                .name(bidDto.getItemId().toString())
                                .data(bidDto)
                );
            } catch (Exception e) {
                deadSseEmitters.add(sseEmitter);
            }
        });
        sseEmitters.removeAll(deadSseEmitters);
    }
}
