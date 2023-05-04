package com.ssafy.star.common.db.dto.response;

import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.util.ParsingUtil;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class MainNumberDto {
	@Schema(description = "SW역량테스트 등급별 취득자 수.")
	SwTier swTier;
    @Schema(description = "백준 티어별 인원수.")
    BojTier bojTier;

	@Getter
	class SwTier {
		int IMCnt;
		int ACnt;
		int APlusCnt;
		int BCnt;
		int CCnt;
		int nullCnt;

		public SwTier(List<Card> cardList, List<User> userList) {
			int IMCnt = 0;
			int ACnt = 0;
			int APlusCnt = 0;
			int BCnt = 0;
			int CCnt = 0;
			int NullCnt = userList.size() - cardList.size();
			for (Card card : cardList) {
				String swTier = ParsingUtil.nullStr2NULL(card.getSwTier());
				switch (swTier) {
					case "IM":
						IMCnt += 1;
						break;
					case "A":
						ACnt += 1;
						break;
					case "A+":
						APlusCnt += 1;
						break;
					case "B":
						BCnt += 1;
						break;
					case "C":
						CCnt += 1;
						break;
					case "NULL":
						NullCnt += 1;
						break;
				}
			}

			this.IMCnt = IMCnt;
			this.ACnt = ACnt;
			this.APlusCnt = APlusCnt;
			this.BCnt = BCnt;
			this.CCnt = CCnt;
			this.nullCnt = NullCnt;

		}
	}

	@Getter
	class BojTier {
		int bronzeCnt;
		int silverCnt;
		int goldCnt;
		int platinumCnt;
		int diamondCnt;
		int rubyCnt;
		int nullCnt;

		public BojTier(List<Card> cardList, List<User> userList) {
			int bronzeCnt = 0;
			int silverCnt = 0;
			int goldCnt = 0;
			int platinumCnt = 0;
			int diamondCnt = 0;
			int rubyCnt = 0;
			int nullCnt = userList.size() - cardList.size();

			for (Card card : cardList) {
				String bojTier = ParsingUtil.nullStr2NULL(card.getBojTier());
				if (bojTier.startsWith("Bronze")) {
					bronzeCnt++;
				} else if (bojTier.startsWith("Silver")) {
					silverCnt++;
				} else if (bojTier.startsWith("Gold")) {
					goldCnt++;
				} else if (bojTier.startsWith("Platinum")) {
					platinumCnt++;
				} else if (bojTier.startsWith("Diamond")) {
					diamondCnt++;
				} else if (bojTier.startsWith("Ruby")) {
					rubyCnt++;
				} else {
					nullCnt++;
				}
			}
			this.bronzeCnt = bronzeCnt;
			this.silverCnt = silverCnt;
			this.goldCnt = goldCnt;
			this.platinumCnt = platinumCnt;
			this.diamondCnt = diamondCnt;
			this.rubyCnt = rubyCnt;
			this.nullCnt = nullCnt;

		}
	}

	public MainNumberDto(List<Card> cardList, List<User> userList) {
		this.swTier = new SwTier(cardList, userList);
		this.bojTier = new BojTier(cardList, userList);
	}
}
