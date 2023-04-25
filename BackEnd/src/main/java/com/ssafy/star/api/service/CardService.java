package com.ssafy.star.api.service;

import java.util.List;

import com.ssafy.star.common.db.dto.response.ConstellationListDto;

public interface CardService {
    void updateBojTier(long userId);
    ConstellationListDto getCardList();

	List<String> searchCompany(String query);
}