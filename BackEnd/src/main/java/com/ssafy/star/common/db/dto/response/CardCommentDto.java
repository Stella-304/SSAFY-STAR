package com.ssafy.star.common.db.dto.response;

import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.entity.CardComment;

import lombok.Getter;

@Getter
public class CardCommentDto {

	long id;
	String content;
	String reply;
	String writer;
	boolean mine;

	public CardCommentDto(CardComment cardComment, Long userId) {
		this.id = cardComment.getId();
		this.content = cardComment.getContent();
		this.reply = cardComment.getReply();
		this.writer = cardComment.getUser().getName();
		this.mine = (cardComment.getUser().getId() - userId) == 0;
	}
}
