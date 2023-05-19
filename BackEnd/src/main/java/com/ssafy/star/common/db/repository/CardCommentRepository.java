package com.ssafy.star.common.db.repository;

import com.ssafy.star.common.db.dto.response.CardCommentDto;
import com.ssafy.star.common.db.entity.CardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardCommentRepository extends JpaRepository<CardComment, Long> {
    @Query("select co From CardComment co join fetch co.user where co.card.id = :cardId")
    List<CardComment> getCommentList(@Param("cardId")Long cardId);

}
