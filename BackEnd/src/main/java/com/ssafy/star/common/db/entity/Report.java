package com.ssafy.star.common.db.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Report {

    @Id @GeneratedValue
    private Long id;

    @Column(length = 10)
    private String article;

    @Column(length = 500)
    private String content;

    @ColumnDefault("false")
    private boolean isResolved;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
