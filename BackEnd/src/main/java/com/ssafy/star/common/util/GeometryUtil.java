package com.ssafy.star.common.util;

public class GeometryUtil {
	static int getLevelFromCardCnt(int cardCnt) {
		if (cardCnt <= 8)
			return 1;
		if (cardCnt <= 25)
			return 2;
		if (cardCnt <= 100)
			return 3;
		if (cardCnt <= 400)
			return 4;
		if (cardCnt <= 1250)
			return 5;
		return 6;
	}
}
