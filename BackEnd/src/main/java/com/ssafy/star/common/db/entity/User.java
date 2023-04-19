package com.ssafy.star.common.db.entity;

import com.ssafy.star.common.auth.info.SocialAuth;
import com.ssafy.star.common.util.entity.BaseTime;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "nickname")
})
@SecondaryTables({
        @SecondaryTable(name = "social_auth", pkJoinColumns = @PrimaryKeyJoinColumn(name = "user_id"))
})
public class User extends BaseTime {

    @Id @GeneratedValue
    @Column(columnDefinition = "int(11) unsigned")
    private Long id;

    @Column(length = 60, nullable = false)
    private String email;

    @Column(length = 10, nullable = false)
    private String nickname;

    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean isAutorized;

    @ToString.Exclude
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "providerId", column = @Column(table = "social_auth", name = "provider_id")),
            @AttributeOverride(name = "socialType", column = @Column(table = "social_auth", name = "social_type")),
    })
    private SocialAuth socialAuth;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    Card card;

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Follow> followList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    List<CardComment> cardCommentList = new ArrayList<>();
}
