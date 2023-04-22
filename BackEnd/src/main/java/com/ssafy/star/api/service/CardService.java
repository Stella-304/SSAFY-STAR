package com.ssafy.star.api.service;

import com.ssafy.star.common.db.dto.response.ConstellationListDto;

public interface CardService {
    void updateBojTier(long userId);
    ConstellationListDto getCardList();
}
