package com.ssafy.star.common.db.dto.request;

import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;

@Getter
@NoArgsConstructor
@ToString
public class CardRegistReqDto {
    @Schema(description = "이름", example = "장재욱")
    private String name;
    @Schema(description = "한마디", example = "여러분 힘내서 취업해봅시다!!!")
    private String content;
    @Schema(description = "기수", example = "8")
    private String generation;
    @Schema(description = "캠퍼스", example = "대전")
    private String campus;
    @Schema(description = "1학기 반", example = "4")
    private String ban;
    @Schema(description = "github 아이디")
    private String githubId;
    @Schema(description = "백준 아이디")
    private String bojId;
    @Schema(description = "백준 티어")
    private String bojTier;
    @Schema(description = "개인 블로그 주소")
    private String blogAddr;
    @Schema(description = "직장", example = "삼성전자")
    private String company;
    @Schema(description = "커리큘럼 트랙", example = "전공 자바반")
    private String track;
    @Schema(description = "전공", example = "컴퓨터공학")
    private String major;
    @Schema(description = "삼성SW역량테스트 등급", example = "B")
    private String swTier;
    @Schema(description = "직무", example = "프론트엔드")
    private String role;
    @Schema(description = "기타",example = "수상내역 : 공통프로젝트 최우수")
    private String etc;

    public Card of(User user){
        return Card.builder()
                .content(this.content)
                .generation(this.generation)
                .campus(this.campus)
                .ban(this.ban)
                .githubId(this.githubId)
                .bojId(this.bojId)
                .bojTier(this.bojTier)
                .blogAddr(this.blogAddr)
                .company(this.company)
                .track(this.track)
                .major(this.major)
                .role(this.role)
                .swTier(this.swTier)
                .etc(this.etc)
                .user(user)
                .build();
    }
}
