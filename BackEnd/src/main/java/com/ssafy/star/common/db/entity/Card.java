package com.ssafy.star.common.db.entity;

import lombok.*;

import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SecondaryTables({
	@SecondaryTable(name = "card_view_cnt", pkJoinColumns = @PrimaryKeyJoinColumn(name = "card_id"))
})
public class Card {

	@Id
	@GeneratedValue
	@Column(columnDefinition = "INT(11) UNSIGNED")
	private Long id;

	//	여기에 한마디도 추가되어야함.
	@Column(length = 140)
	private String content;

	@Column(length = 2, nullable = false)
	private int generation;

	@Column(length = 10, nullable = false)
	private String campus;

	@Column(length = 2)
	private int ban;

	@Column(length = 20)
	private String githubId;

	@Column(length = 20)
	private String bojId;

	@Column(length = 20)
	private String bojTier;

	@Column(length = 10)
	private String major;

	@Column(length = 10)
	private String swTier;

	@Column(length = 140)
	private String etc;

	@Column(length=10)
	private String role;
	
	@Column
	private String blogAddr;

	@Column(length = 40)
	private String company;

	@Column(length = 20)
	private String track;

	@Column(columnDefinition = "int(11) unsigned", table = "card_view_cnt")
	@ColumnDefault("0")
	private int hit;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	public void updateBojTier(String bojTier) {
		this.bojTier = bojTier;
	}

	@Override
	public String toString() {
		return "CardInfo " + this.user.getName();
	}
}
