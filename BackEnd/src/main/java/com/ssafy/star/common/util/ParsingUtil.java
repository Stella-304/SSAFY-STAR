package com.ssafy.star.common.util;

public class ParsingUtil {

	static String[] bojTierTable = {"Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ruby"};

	static String getTier4Level(int level) {
		// solved.ac API 에서 제공하는 문제 레벨을 등급으로 바꾸어줍니다.
		// EX) 3 -> Bronze3, 4 -> Broneze2
		// 1,2,3,4,5 -> 브론즈
		// 6,7,8,9,10 -> 실버 ...
		if (level == 0)
			return "Unrated";
		int flag = (level - 1) / 5;
		return bojTierTable[flag] + (6 - (level - flag * 5));
	}
}
