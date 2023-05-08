package com.ssafy.star.common.db.dto.request;

import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.entity.CardComment;
import com.ssafy.star.common.db.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class CardCommentRegistReqDto {
    @Schema(description = "코멘트 내용", example = "역시!! 대단한 싸피인입니다~")
    private String content;
    @Schema(description = "카드번호")
    private Long cardId;


    public CardComment of(Card card,User user){
        return CardComment.builder()
                .content(this.content)
                .card(card)
                .user(user)
                .build();
    }

}
