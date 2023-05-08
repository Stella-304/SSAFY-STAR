package com.ssafy.star.common.db.dto.request;

import io.swagger.models.auth.In;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.springframework.boot.context.properties.bind.DefaultValue;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
}

