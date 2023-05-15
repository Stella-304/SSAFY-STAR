package com.ssafy.star.common.db.repository;

import com.ssafy.star.common.db.repository.querydsl.CardRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.star.common.db.entity.Card;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Long>, CardRepositoryCustom {

//    @Query("select cd From Card cd join fetch cd.user where cd.user.isAuthorized=true")
    @Query("select cd From Card cd join fetch cd.user")
    List<Card> getAllCardListWithUser();

    @Query("select cd From Card cd join fetch cd.user where cd.company = :searchValue")
    List<Card> getAllFilteredByCompany(@Param("searchValue")String searchValue);
    @Query("select cd From Card cd join fetch cd.user where cd.track = :searchValue")
    List<Card> getAllFilteredByTrack(@Param("searchValue")String searchValue);
    @Query("select cd From Card cd join fetch cd.user where cd.role = :searchValue")
    List<Card> getAllFilteredByRole(@Param("searchValue")String searchValue);
    @Query("select cd From Card cd join fetch cd.user where cd.swTier = :searchValue")
    List<Card> getAllFilteredBySwTier(@Param("searchValue")String searchValue);
    @Query("select cd From Card cd join fetch cd.user where cd.major = :searchValue")
    List<Card> getAllFilteredByMajor(@Param("searchValue")String searchValue);
    @Query("select cd From Card cd join fetch cd.user where cd.bojTier = :searchValue")
    List<Card> getAllFilteredByBojTier(@Param("searchValue")String searchValue);
    @Query("select cd From Card cd join fetch cd.user where cd.generation = :searchValue")
    List<Card> getAllFilteredByGeneration(@Param("searchValue")String searchValue);
    @Query("select cd From Card cd join fetch cd.user where cd.generation = :gen and cd.campus = :cam")
    List<Card> getAllFilteredByCampus(@Param("gen")String gen,@Param("cam")String cam);
    @Query("select cd From Card cd join fetch cd.user where cd.generation = :gen and cd.campus = :cam and cd.ban = :ban")
    List<Card> getAllFilteredByBan(@Param("gen")String gen,@Param("cam")String cam,@Param("ban")String ban);
}
