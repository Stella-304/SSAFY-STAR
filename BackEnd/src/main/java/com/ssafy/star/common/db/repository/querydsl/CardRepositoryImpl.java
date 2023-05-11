package com.ssafy.star.common.db.repository.querydsl;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.star.common.db.dto.request.SearchConditionReqDto;
import com.ssafy.star.common.db.dto.response.CardDetailDto;
import com.ssafy.star.common.db.entity.Card;

import lombok.RequiredArgsConstructor;

import static com.ssafy.star.common.db.entity.QCard.card;

import java.util.List;

@RequiredArgsConstructor
public class CardRepositoryImpl implements CardRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public List<Card> searchBySearchCondition(SearchConditionReqDto searchConditionReqDto) {

		QueryResults<Card> results = queryFactory
			.selectFrom(card)
			.join(card.user)
			.fetchJoin()
			.from(card)
			.where(searchCondition(searchConditionReqDto))
			.fetchResults();

		return results.getResults();
	}

	private BooleanExpression searchCondition(SearchConditionReqDto searchConditionReqDto) {
		BooleanExpression predicate = Expressions.asBoolean(true).isTrue();
		for (String searchColumn : searchConditionReqDto.getlists().keySet()) {
			List<String> list = searchConditionReqDto.getlists().get(searchColumn);
			if (list != null && !list.isEmpty()) {
				if (searchColumn.equals("ban")) {
					predicate = predicate.and(card.ban.in(list));
				} else if (searchColumn.equals("generation")) {
					predicate = predicate.and(card.generation.in(list));
				} else if (searchColumn.equals("campus")) {
					predicate = predicate.and(card.campus.in(list));
				} else if (searchColumn.equals("company")) {
					predicate = predicate.and(card.company.in(list));
				} else if (searchColumn.equals("bojTier")) {
					predicate = predicate.and(card.bojTier.in(list));
				} else if (searchColumn.equals("track")) {
					predicate = predicate.and(card.track.in(list));
				} else if (searchColumn.equals("major")) {
					predicate = predicate.and(card.major.in(list));
				} else if (searchColumn.equals("role")) {
					predicate = predicate.and(card.role.in(list));
				} else if (searchColumn.equals("swTier")) {
					predicate = predicate.and(card.swTier.in(list));
				}
			}

		}
		return predicate;
	}

}
