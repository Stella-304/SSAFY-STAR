package com.ssafy.star.common.util;

import com.ssafy.star.common.auth.enumeration.GroupFlagEnum;

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

	public static String nullStr2NULL(String str) {
		return str == null || str.equals("") ? "NULL" : str;
	}

	public static String getGroupName(GroupFlagEnum groupFlagEnum, String keyName) {
		String processedGroupName = keyName;
		if (groupFlagEnum == GroupFlagEnum.DETAIL) {
			processedGroupName = keyName.replace("기", "기/").replace("캠퍼스", "/");
		}
		if (groupFlagEnum == GroupFlagEnum.GENERATION) {
			processedGroupName += "기";
		}
		if (groupFlagEnum == GroupFlagEnum.CAMPUS) {
			processedGroupName += "캠퍼스";
		}
		return processedGroupName;

	}
}
