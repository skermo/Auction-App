package com.internship.auctionapp.repository;

import com.internship.auctionapp.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ShipmentRepository extends JpaRepository<Shipment, UUID> {
    boolean existsByItemId(UUID itemId);
}
