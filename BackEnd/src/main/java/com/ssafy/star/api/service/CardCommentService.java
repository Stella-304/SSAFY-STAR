package com.ssafy.star.api.service;

import com.ssafy.star.common.db.dto.request.*;
import com.ssafy.star.common.db.dto.response.CardCommentDto;
import com.ssafy.star.common.db.dto.response.CardDetailDto;
import com.ssafy.star.common.db.dto.response.ConstellationListDto;

import java.util.List;

public interface CardCommentService {


	void registCardComment(CardCommentRegistReqDto cardCommentRegistReqDto);

	void updateCardComment(CardCommentUpdateReqDto cardCommentUpdateReqDto) throws Exception;

	void deleteCardComment(Long cardCommentId);

	List<CardCommentDto> getCardCommentList(Long cardId);

	void registCommentReply(CommentReplyRegistReqDto commentReplyRegistReqDto);

	void updateCommentReply(CommentReplyUpdateReqDto commentReplyUpdateReqDto);

	void deleteCommentReply(Long cardCommentId);
}
