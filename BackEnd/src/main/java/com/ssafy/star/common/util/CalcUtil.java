package com.ssafy.star.common.util;

import com.ssafy.star.common.db.dto.response.CardDetailDto;

public class CalcUtil {
	// ccw알고리즘 => 시계방향:-1, 일직선:0, 반시계:1
	public static int ccw(CardDetailDto a, CardDetailDto b, CardDetailDto c) {
		double ccwR = (a.getX() * b.getZ() + b.getX() * c.getZ() + c.getX() * a.getZ()) - (b.getX() * a.getZ()
			+ c.getX() * b.getZ() + a.getX() * c.getZ());
		if (ccwR > 0)
			return 1;
		if (ccwR < 0)
			return -1;
		return 0;
	}

	public static double dist(CardDetailDto a, CardDetailDto b) {
		return (b.getX() - a.getX()) * (b.getX() - a.getX()) + (b.getZ() - a.getZ()) * (b.getZ() - a.getZ());
	}
}
