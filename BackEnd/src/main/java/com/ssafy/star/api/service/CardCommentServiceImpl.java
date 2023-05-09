package com.ssafy.star.api.service;

import com.ssafy.star.common.db.dto.request.*;
import com.ssafy.star.common.db.dto.response.CardCommentDto;
import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.entity.CardComment;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.CardCommentRepository;
import com.ssafy.star.common.db.repository.CardRepository;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.exception.CommonApiException;
import com.ssafy.star.common.provider.AuthProvider;
import com.ssafy.star.common.util.constant.CommonErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Log4j2
@Service
@RequiredArgsConstructor
public class CardCommentServiceImpl implements CardCommentService {
    final UserRepository userRepository;
    final CardRepository cardRepository;
    final CardCommentRepository cardCommentRepository;
    final AuthProvider authProvider;

    @Override
    @Transactional
    public void registCardComment(CardCommentRegistReqDto cardCommentRegistReqDto) {
        long userId = authProvider.getUserIdFromPrincipal();
        User user = userRepository.findById(userId).orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));
        Card card = Card.builder().id(cardCommentRegistReqDto.getCardId()).build();
        CardComment cardComment = cardCommentRegistReqDto.of(card, user);
        cardCommentRepository.save(cardComment);
    }

    @Override
    @Transactional
    public void updateCardComment(CardCommentUpdateReqDto cardCommentUpdateReqDto) {
        CardComment cardComment = cardCommentRepository.findById(cardCommentUpdateReqDto.getId()).orElseThrow(() -> new CommonApiException(CommonErrorCode.NO_COMMENT_PROVIDED));
        cardComment.of(cardCommentUpdateReqDto);
    }

    @Override
    @Transactional
    public void deleteCardComment(Long cardCommentId) {
        cardCommentRepository.deleteById(cardCommentId);
    }

    @Override
    @Transactional
    public List<CardCommentDto> getCardCommentList(Long cardId) {
        long userId = authProvider.getUserIdFromPrincipal();
        List<CardComment> list = cardCommentRepository.getCommentList(cardId);
        List<CardCommentDto> result = new ArrayList<>();
        list.stream().forEach(x -> {
            result.add(new CardCommentDto(x, userId));
        });

        return result;
    }

    @Override
    @Transactional
    public void registCommentReply(CommentReplyRegistReqDto commentReplyRegistReqDto) {
        CardComment cardComment = cardCommentRepository.findById(commentReplyRegistReqDto.getCommentId()).orElseThrow(() -> new CommonApiException(CommonErrorCode.NO_COMMENT_PROVIDED));
        cardComment.setReply(commentReplyRegistReqDto.getContent());
    }

    @Override
    @Transactional
    public void updateCommentReply(CommentReplyUpdateReqDto commentReplyUpdateReqDto) {
        CardComment cardComment = cardCommentRepository.findById(commentReplyUpdateReqDto.getCommentId()).orElseThrow(() -> new CommonApiException(CommonErrorCode.NO_COMMENT_PROVIDED));
        cardComment.setReply(commentReplyUpdateReqDto.getContent());
    }

    @Override
    @Transactional
    public void deleteCommentReply(Long cardCommentId) {
        CardComment cardComment = cardCommentRepository.findById(cardCommentId).orElseThrow(() -> new CommonApiException(CommonErrorCode.NO_COMMENT_PROVIDED));
        cardComment.setReply(null);
    }
}
