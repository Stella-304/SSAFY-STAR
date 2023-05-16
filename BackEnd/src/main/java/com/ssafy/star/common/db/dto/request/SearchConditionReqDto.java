package com.ssafy.star.common.db.dto.request;

import java.lang.reflect.Field;
import java.util.ArrayList;
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
		map.put("generation", generation);
		map.put("campus", campus);
		map.put("ban", ban);
		map.put("company", company);
		map.put("bojTier", bojTier);
		map.put("track", track);
		map.put("major", major);
		map.put("role", role);
		map.put("swTier", swTier);
		return map;
	}

	public String ofFilterName() {
		StringBuilder filterName;
		List<String> finalResult = new ArrayList<>();
		if (generation.size() > 0) {
			Collections.sort(generation);
			String[] generationArray = generation.toArray(new String[0]);
			filterName = new StringBuilder();
			filterName.
				append('[')
				.append(String.join(",", generationArray))
				.append(']')
				.append("기");
			finalResult.add(filterName.toString());
		}
		if (campus.size() > 0) {
			int i = 0;
			String[] campusArray = new String[campus.size()];
			for (String campusName : new String[] {"서울", "대전", "광주", "구미", "부울경"}) {
				if (campus.contains(campusName))
					campusArray[i++] = campusName;
			}
			filterName = new StringBuilder();
			filterName
				.append('[')
				.append(String.join(",", campusArray))
				.append(']')
				.append("캠퍼스");
			finalResult.add(filterName.toString());

		}
		if (ban.size() > 0) {
			Collections.sort(ban);
			String[] banArray = ban.toArray(new String[0]);
			filterName = new StringBuilder();

			filterName.
				append('[')
				.append(String.join(",", banArray))
				.append(']')
				.append("반");
			finalResult.add(filterName.toString());

		}

		if (company.size() > 0) {
			Collections.sort(company);
			String[] companyArray = company.toArray(new String[0]);
			filterName = new StringBuilder();

			filterName.
				append('[')
				.append(String.join(",", companyArray))
				.append(']');
			finalResult.add(filterName.toString());

		}

		if (major.size() > 0) {
			Collections.sort(major);
			String[] majorArray = major.toArray(new String[0]);
			filterName = new StringBuilder();

			filterName.
				append('[')
				.append(String.join(",", majorArray))
				.append(']');
			finalResult.add(filterName.toString());

		}

		if (role.size() > 0) {
			Collections.sort(major);
			String[] roleArray = role.toArray(new String[0]);
			filterName = new StringBuilder();

			filterName.
				append('[')
				.append(String.join(",", roleArray))
				.append(']');
			finalResult.add(filterName.toString());

		}

		if (track.size() > 0) {
			Collections.sort(track);
			String[] trackArray = track.toArray(new String[0]);
			filterName = new StringBuilder();

			filterName.
				append('[')
				.append(String.join(",", trackArray))
				.append(']')
				.append("트랙");
			finalResult.add(filterName.toString());

		}

		if (swTier.size() > 0) {
			Collections.sort(major);
			String[] swTierArray = swTier.toArray(new String[0]);
			filterName = new StringBuilder();

			filterName.
				append('[')
				.append(String.join(",", swTierArray))
				.append(']');
			finalResult.add(filterName.toString());

		}

		if (bojTier.size() > 0) {
			int i = 0;
			String[] bojTierArray = new String[bojTier.size()];
			for (String boj : new String[] {"Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ruby"}) {
				if (bojTier.contains(boj))
					bojTierArray[i++] = boj;
			}
			filterName = new StringBuilder();

			filterName
				.append('[')
				.append(String.join(",", bojTierArray))
				.append(']');
			finalResult.add(filterName.toString());

		}

		return finalResult.size() == 0 ? "전체" : String.join(" & ", finalResult);
	}
}



