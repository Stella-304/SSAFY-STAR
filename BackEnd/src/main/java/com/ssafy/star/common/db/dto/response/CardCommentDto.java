package com.ssafy.star.common.db.dto.response;

import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.entity.CardComment;
import lombok.Getter;

@Getter
public class CardCommentDto {

	String content;
	String reply;
	String writer;

	public CardCommentDto(CardComment cardComment) {
		this.content=cardComment.getContent();
		this.reply=cardComment.getReply();
		this.writer=cardComment.getUser().getName();
	}
}
