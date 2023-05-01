package com.ssafy.star.common.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.star.common.db.entity.Card;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

    @Query("select cd From Card cd join fetch cd.user")
    List<Card> getAllCardListWithUser();

    @Query("select cd From Card cd join fetch cd.user where :searchColumn=:searchValue")
    List<Card> getFiltered(String searchColumn, String searchValue);



}
