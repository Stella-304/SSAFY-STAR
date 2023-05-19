package com.ssafy.star.common.db.entity;

import com.ssafy.star.common.auth.enumeration.GroupFlagEnum;
import com.ssafy.star.common.db.dto.request.CardUpdateReqDto;

import lombok.*;

import org.hibernate.annotations.ColumnDefault;
//import com.ssafy.star.common.db.entity.

import javax.persistence.*;

import java.util.Optional;

import static com.ssafy.star.common.db.entity.QCard.card;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Card {

	@Id
	@GeneratedValue
	@Column(columnDefinition = "INT(11) UNSIGNED")
	private Long id;

	//	여기에 한마디도 추가되어야함.
	@Column(length = 140, nullable = false)
	private String content;

	@Column(length = 2, nullable = false)
	private String generation;

	@Column(length = 10, nullable = false)
	private String campus;

	@Column(length = 2, nullable = false)
	private String ban;

	@Column(length = 20)
	private String githubId;

	@Column(length = 40)
	private String bojId;

	@Column(length = 20)
	private String bojTier;

	@Column(length = 20)
	private String major;

	@Column(length = 20)
	private String swTier;

	@Column(length = 140)
	private String etc;

	@Column(length = 20)
	private String role;

	@Column
	private String blogAddr;

	@Column(length = 40)
	private String company;

	@Column(length = 20)
	private String track;

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

	public void of(CardUpdateReqDto cardUpdateReqDto) {
		Optional.ofNullable(cardUpdateReqDto.getContent()).ifPresent(x -> this.content = x);
		Optional.ofNullable(cardUpdateReqDto.getGeneration()).ifPresent(x -> this.generation = x);
		Optional.ofNullable(cardUpdateReqDto.getCampus()).ifPresent(x -> this.campus = x);
		Optional.ofNullable(cardUpdateReqDto.getBan()).ifPresent(x -> this.ban = x);
		Optional.ofNullable(cardUpdateReqDto.getGithubId()).ifPresent(x -> this.githubId = x);
		Optional.ofNullable(cardUpdateReqDto.getBojId()).ifPresent(x -> this.bojId = x);
		Optional.ofNullable(cardUpdateReqDto.getBojTier()).ifPresent(x -> this.bojTier = x);
		Optional.ofNullable(cardUpdateReqDto.getBlogAddr()).ifPresent(x -> this.blogAddr = x);
		Optional.ofNullable(cardUpdateReqDto.getCompany()).ifPresent(x -> this.company = x);
		Optional.ofNullable(cardUpdateReqDto.getEtc()).ifPresent(x -> this.etc = x);
		Optional.ofNullable(cardUpdateReqDto.getRole()).ifPresent(x -> this.role = x);
		Optional.ofNullable(cardUpdateReqDto.getSwTier()).ifPresent(x -> this.swTier = x);
		Optional.ofNullable(cardUpdateReqDto.getMajor()).ifPresent(x -> this.major = x);
		Optional.ofNullable(cardUpdateReqDto.getTrack()).ifPresent(x -> this.track = x);
	}

	public String getGroupFlag(GroupFlagEnum flagEnum) {
		String value = "";
		if (flagEnum == GroupFlagEnum.CAMPUS) {
			value = Optional.ofNullable(this.campus).orElse("Unknown");
		}

		if (flagEnum == GroupFlagEnum.GENERATION) {
			value = Optional.ofNullable(this.generation).orElse("Unknown");
		}

		if (flagEnum == GroupFlagEnum.BOJTIER) {
			value = Optional.ofNullable(this.bojTier).orElse("Unknown");
		}

		if (flagEnum == GroupFlagEnum.SWTIER) {
			value = Optional.ofNullable(this.swTier).orElse("Unknown");
		}

		if (flagEnum == GroupFlagEnum.DETAIL) {
			value = this.generation + "기" + this.campus + "캠퍼스" + this.ban + "반";
		}

		if (flagEnum == GroupFlagEnum.COMPANY) {
			value = this.company;
		}

		if (flagEnum == GroupFlagEnum.NONE) {
			value = "SSAFY";
		}

		return value.isBlank() ? "Unknown" : value;

	}

}
