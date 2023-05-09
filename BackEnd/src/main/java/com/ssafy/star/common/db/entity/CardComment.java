package com.ssafy.star.common.db.entity;

import com.ssafy.star.common.db.dto.request.CardCommentUpdateReqDto;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CardComment {

    @Id @GeneratedValue
    private Long id;

    @Column(columnDefinition = "mediumtext")
    private String content;
    @Column
    private String reply;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="card_id")
    private Card card;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void of(CardCommentUpdateReqDto cardCommentUpdateReqDto){
        Optional.ofNullable(cardCommentUpdateReqDto.getContent()).ifPresent(x -> this.content = x);
    }
}
