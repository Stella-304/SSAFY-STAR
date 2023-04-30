package com.ssafy.star.common.db.dto.response;

import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.entity.Coordinate;
import lombok.Getter;

@Getter
public class CardDetailDto {

    long cardId;
    double x;
    double y;
    double z;
    int generation;
    String campus;
    int ban;

    String githubId;
    String bojId;
    String bojTier;
    String blogAddr;
    String company;
    String track;
    String email;
    String nickname;
    boolean isAutorized;

    public CardDetailDto(Card card, double x, double y, double z) {
        this.cardId = card.getId();
        this.x = x;
        this.y = y;
        this.z = z;
        this.generation = card.getGeneration();
        this.campus = card.getCampus();
        this.ban = card.getBan();
        this.githubId = card.getGithubId();
        this.bojId = card.getBojId();
        this.bojTier = card.getBojTier();
        this.blogAddr = card.getBlogAddr();
        this.company = card.getCompany();
        this.track = card.getTrack();
        this.email = card.getUser().getEmail();
        this.nickname = card.getUser().getNickname();
        this.isAutorized = card.getUser().isAutorized();
    }
}
