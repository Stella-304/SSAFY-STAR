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

	@Column
	private String blogAddr;

	@Column(length = 40)
	private String company;

	@Column(length = 40,name="company_asset_size")
	private String companyAssetSize;

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

}
