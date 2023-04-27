package com.ssafy.star.common.db.dto.request;

import com.ssafy.star.common.db.entity.Card;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class CardUpdateReqDto {
    @Schema(description = "카드아이디", example = "13163")
    private long id;

    @Schema(description = "기수", example = "8")
    private int generation;
    @Schema(description = "캠퍼스", example = "대전")
    private String campus;
    @Schema(description = "1학기 반", example = "4")
    private int ban;
    @Schema(description = "github 아이디", example = "graywhales")
    private String githubId;
    @Schema(description = "백준 아이디", example = "graywhale")
    private String bojId;
    @Schema(description = "개인 블로그 주소", example = "https://blog.naver.com/PostList.naver?blogId=gy57927")
    private String blogAddr;
    @Schema(description = "직장", example = "삼성전자")
    private String company;
    @Schema(description = "커리큘럼 트랙", example = "비전공 자바반")
    private String track;

    public Card of(){
        return Card.builder()
                .generation(this.generation)
                .campus(this.campus)
                .ban(this.ban)
                .githubId(this.githubId)
                .bojId(this.bojId)
                .blogAddr(this.blogAddr)
                .company(this.company)
                .track(this.track)
                .build();
    }
}
