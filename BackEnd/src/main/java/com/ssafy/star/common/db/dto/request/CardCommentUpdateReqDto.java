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
public class CardCommentUpdateReqDto {

    @Schema(description = "코멘트아이디")
    private Long id;
    @Schema(description = "코멘트 내용", example = "역시!! 수정된 코멘트 내용입니다!!")
    private String content;

}
