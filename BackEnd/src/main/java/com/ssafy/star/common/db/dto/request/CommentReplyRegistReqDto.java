package com.ssafy.star.common.db.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class CommentReplyRegistReqDto {
    @Schema(description = "코멘트 내용", example = "역시!! 대단한 싸피인입니다~")
    private String content;
    @Schema(description = "코멘트번호")
    private Long commentId;


}
