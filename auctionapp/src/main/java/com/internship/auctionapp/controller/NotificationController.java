package com.internship.auctionapp.controller;

import com.internship.auctionapp.dto.NotificationDto;
import com.internship.auctionapp.service.NotificationService;
import com.internship.auctionapp.service.SseEmitterService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/notifications")
public class NotificationController {
    private final SseEmitterService sseEmitterService;
    private final NotificationService notificationService;

    public NotificationController(SseEmitterService sseEmitterService, NotificationService notificationService) {
        this.sseEmitterService = sseEmitterService;
        this.notificationService = notificationService;
    }


    @GetMapping("/add-connection/{id}")
    @PreAuthorize("#id == authentication.principal.id")
    public SseEmitter addSSeEmitter(@PathVariable(name = "id") UUID id) {
        SseEmitter sseEmitter = new SseEmitter(-1L);
        sseEmitterService.addSseEmitter(sseEmitter);
        return sseEmitter;
    }

    @GetMapping("/{id}")
    public Page<NotificationDto> getAllUnreadNotifications(@PathVariable(name = "id") UUID id,
                                                           @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
                                                           @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
        return notificationService.getAllUnreadNotifications(id, pageNo, pageSize);
    }

    @DeleteMapping("/{userId}/{id}")
    @PreAuthorize("#userId == authentication.principal.id")
    public ResponseEntity<String> deleteNotification(@PathVariable(name = "userId") UUID userId,
                                                     @PathVariable(name = "id") UUID id) {
        notificationService.deleteNotification(id);
        return new ResponseEntity<>("Notification successfully deleted", HttpStatus.OK);
    }

}
