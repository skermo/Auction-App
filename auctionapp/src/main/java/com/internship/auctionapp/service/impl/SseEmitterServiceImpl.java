package com.internship.auctionapp.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.internship.auctionapp.service.SseEmitterService;

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
    public <T> void notify(T element, String eventName) {
        List<SseEmitter> deadSseEmitters = new ArrayList<>();
        sseEmitters.forEach(sseEmitter -> {
            try {
                sseEmitter.send(
                        SseEmitter.event()
                                .name(eventName)
                                .data(element));
            } catch (Exception e) {
                deadSseEmitters.add(sseEmitter);
            }
        });
        sseEmitters.removeAll(deadSseEmitters);
    }

}
