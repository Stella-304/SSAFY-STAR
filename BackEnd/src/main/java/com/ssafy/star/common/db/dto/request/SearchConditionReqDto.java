package com.ssafy.star.common.db.dto.request;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class SearchConditionReqDto {
	private List<String> ban;
	private List<String> generation;
	private List<String> campus;
	private List<String> company;
	private List<String> bojTier;
	private List<String> track;
	private List<String> major;
	private List<String> role;
	private List<String> swTier;
	private String groupFlag;

	public Map<String, List<String>> getlists() {
		HashMap<String, List<String>> map = new HashMap<>();
		map.put("ban", ban);
		map.put("generation", generation);
		map.put("campus", campus);
		map.put("company", company);
		map.put("bojTier", bojTier);
		map.put("track", track);
		map.put("major", major);
		map.put("role", role);
		map.put("swTier", swTier);
		return map;
	}

	public String ofFilterName() {
		StringBuilder filterName = new StringBuilder();
		boolean isFirst = true;
		if (generation.size() > 0 && generation.size() < 10) {
			Collections.sort(generation);
			String[] generationArray = generation.toArray(new String[0]);
			filterName.
				append('[')
				.append(String.join(",", generationArray))
				.append(']')
				.append("기");
			isFirst = false;
		}

		if (campus.size() > 0 && campus.size() < 5) {
			if (!isFirst)
				filterName.append(" & ");
			int i = 0;
			String[] campusArray = new String[campus.size()];
			for (String campusName : new String[] {"서울", "대전", "광주", "구미", "부울경"}) {
				if (campus.contains(campusName))
					campusArray[i++] = campusName;
			}

			filterName
				.append('[')
				.append(String.join(",", campusArray))
				.append(']')
				.append("캠퍼스");

		}
		if (ban.size() > 0) {
			if (!isFirst)
				filterName.append(" & ");
			Collections.sort(ban);
			String[] banArray = ban.toArray(new String[0]);
			filterName.
				append('[')
				.append(String.join(",", banArray))
				.append(']')
				.append("반");
			isFirst = false;
		}
		if (track.size() > 0 && track.size() < 5) {
			if (!isFirst)
				filterName.append(" & ");
			Collections.sort(track);
			String[] trackArray = track.toArray(new String[0]);
			filterName.
				append('[')
				.append(String.join(",", trackArray))
				.append(']')
				.append("트랙");
			isFirst = false;
		}

		if (major.size() == 1) {
			if (!isFirst)
				filterName.append(" & ");
			Collections.sort(major);
			String[] majorArray = major.toArray(new String[0]);
			filterName.
				append('[')
				.append(String.join(",", majorArray))
				.append(']');
			isFirst = false;
		}
		System.out.println(filterName.toString());
		return filterName.toString();
	}
}



