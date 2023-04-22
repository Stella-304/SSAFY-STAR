package com.ssafy.star.common.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.star.common.db.entity.Card;

public interface CardRepository extends JpaRepository<Card, Long> {
}
