package com.ssafy.star.common.db.repository.querydsl;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.star.common.db.dto.request.SearchConditionReqDto;
import com.ssafy.star.common.db.dto.response.CardDetailDto;
import com.ssafy.star.common.db.entity.Card;
import lombok.RequiredArgsConstructor;

import static com.ssafy.star.common.db.entity.QCard.card;

import java.util.List;
@RequiredArgsConstructor
public class CardRepositoryImpl implements CardRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Card> searchBySearchCondition(SearchConditionReqDto searchConditionReqDto) {

        QueryResults<Card> results=queryFactory
                .select(Projections.constructor(Card.class
                        ,card.ban
                        ,card.bojId
                        ,card.etc
                        ,card.company
                        ,card.id
                        ,card.blogAddr
                        ,card.bojTier
                        ,card.campus
                        ,card.content
                        ,card.generation
                        ,card.githubId
                        ,card.hit
                        ,card.major
                        ,card.role
                        ,card.swTier
                        ,card.track
                        ,card.user
                )).from(card).where().fetchResults();

        return results.getResults();
    }

    private BooleanExpression searchCondition(SearchConditionReqDto searchConditionReqDto) {
//        if(keyword == null) return null;

        BooleanExpression predicate = card.id.isNotNull();
        if(!searchConditionReqDto.isIntersection()) {
            for (String searchColumn : searchConditionReqDto.getlists().keySet()) {
                List<String> list = searchConditionReqDto.getlists().get(searchColumn);
                if (searchColumn.equals("ban")) {
                    for (String value : list) {
                        predicate = predicate.or(card.ban.equalsIgnoreCase(value));
                    }
                } else if (searchColumn.equals("generation")) {
                    for (String value : list) {
                        predicate = predicate.or(card.generation.equalsIgnoreCase(value));
                    }
                } else {
                    for (String value : list) {
                        predicate = predicate.or(searchCondition(value));
                    }
                }
            }
        }else{
            for (String searchColumn : searchConditionReqDto.getlists().keySet()) {
                List<String> list = searchConditionReqDto.getlists().get(searchColumn);
                if (searchColumn.equals("ban")) {
                    for (String value : list) {
                        predicate = predicate.and(card.ban.equalsIgnoreCase(value));
                    }
                } else if (searchColumn.equals("generation")) {
                    for (String value : list) {
                        predicate = predicate.and(card.generation.equalsIgnoreCase(value));
                    }
                } else {
                    for (String value : list) {
                        predicate = predicate.and(searchCondition(value));
                    }
                }
            }
        }

        return predicate;
    }
    private BooleanExpression searchCondition(String keyword) {
        if(keyword == null) return null;

        return card.bojTier.contains(keyword)
                .or(card.campus.contains(keyword))
                .or(card.company.contains(keyword))
                .or(card.major.contains(keyword))
                .or(card.role.contains(keyword))
                .or(card.swTier.contains(keyword))
                .or(card.track.contains(keyword));
    }

}
