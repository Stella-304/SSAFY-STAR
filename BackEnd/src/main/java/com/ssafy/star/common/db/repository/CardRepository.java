package com.ssafy.star.common.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.star.common.db.entity.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
}