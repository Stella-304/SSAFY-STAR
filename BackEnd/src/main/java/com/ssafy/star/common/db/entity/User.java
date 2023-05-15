package com.ssafy.star.common.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.star.common.auth.enumeration.BadgeEnum;
import com.ssafy.star.common.auth.enumeration.LoginTypeEnum;
import com.ssafy.star.common.util.entity.BaseTime;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@ToString
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(uniqueConstraints = {
	@UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "nickname"),
})
public class User extends BaseTime {

    @Id @GeneratedValue
    @Column(columnDefinition = "int(11) unsigned")
    private Long id;

    @Column(length = 60, nullable = false)
    private String email;

    @Column(length = 5)
    private String name;

    @Column(length = 10, nullable = true)
    private String nickname;

    @Column(nullable = false)
    private boolean isAuthorized;

    @Column(nullable = false)
    private boolean companyIsAuthorized;

    @Column(length = 10)
    @Enumerated(EnumType.STRING)
    private LoginTypeEnum loginType;

    @Column(length = 60)
    private String accountPwd;

    @Column
    private String providerId;

    @Column(length = 15)
    @Setter(AccessLevel.NONE)
    @JsonIgnore
    @ToString.Exclude
    @Builder.Default
    @ElementCollection(fetch = FetchType.LAZY)
//    @CollectionTable() -> 테이블명 지정 가능
    Set<String> authoritySet = new LinkedHashSet<>();

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "card_id")
    Card card;

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Follow> followList = new ArrayList<>();

	@Builder.Default
	@OneToMany(mappedBy = "user", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST,
		CascadeType.REFRESH})
	List<CardComment> cardCommentList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Report> reportList = new ArrayList<>();

    public void setNickname(String nickname) {this.nickname = nickname; }
    public void setName(String name) {this.name = name; }
	public void setCard(Card card) {
		this.card = card;
	}

    public void setAccountPwd(String accountPwd) {this.accountPwd = accountPwd; }

	public void equipBadge(BadgeEnum badgeEnum) {

		if (badgeEnum == BadgeEnum.COMPANY) {
			this.companyIsAuthorized = true;
		}
		if (badgeEnum == BadgeEnum.SSAFY) {
			this.isAuthorized = true;
		}

	}
}
