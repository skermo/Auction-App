package com.internship.auctionapp.repository;

import com.internship.auctionapp.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface CardRepository extends JpaRepository<Card, String> {
    List<Card> findAllByUserId(UUID userId);
}
