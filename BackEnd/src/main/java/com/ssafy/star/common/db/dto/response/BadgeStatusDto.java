package com.ssafy.star.common.db.dto.response;

import com.ssafy.star.common.db.entity.AuthStatus;
import lombok.Getter;

import java.util.Optional;

@Getter
public class BadgeStatusDto {
    String badgeStatus;

    public BadgeStatusDto(String status) {
        this.badgeStatus = status;
    }
}
