package com.ssafy.star.common.db.entity;

import com.ssafy.star.common.auth.info.SocialAuth;
import com.ssafy.star.common.util.entity.BaseTime;
import lombok.*;

import javax.persistence.*;

@ToString(exclude = "socialAuth")
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
@SecondaryTables({
        @SecondaryTable(name = "social_auth", pkJoinColumns = @PrimaryKeyJoinColumn(name = "user_id"))
})
public class User extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private long id;

    @Column(name = "email", length = 200, nullable = false)
    private String email;

    @Column(name = "nickname", length = 50, nullable = false)
    private String nickname;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "providerId", column = @Column(table = "social_auth", name = "provider_id")),
            @AttributeOverride(name = "socialType", column = @Column(table = "social_auth", name = "social_type")),
            @AttributeOverride(name = "email", column = @Column(table = "social_auth", name = "email", length = 100, nullable = false)),
            @AttributeOverride(name = "name", column = @Column(table = "social_auth", name = "name", length = 100, nullable = false)),
            @AttributeOverride(name = "imageUrl", column = @Column(table = "social_auth", name = "image_url", columnDefinition = "TEXT")),
    })
    private SocialAuth socialAuth;

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}
