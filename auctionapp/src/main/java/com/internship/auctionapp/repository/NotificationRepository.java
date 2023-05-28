package com.internship.auctionapp.repository;

import com.internship.auctionapp.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    Page<Notification> findAllByUserId(UUID userId, Pageable pageable);
    List<Notification> findAllByUserId(UUID userId);
}
