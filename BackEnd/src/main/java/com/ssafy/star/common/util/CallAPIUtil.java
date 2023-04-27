package com.ssafy.star.common.util;

import java.util.List;
import java.util.Map;

import org.springframework.web.client.RestTemplate;

public class CallAPIUtil {
	static String solvedACRoot = "https://solved.ac/api/v3/";

	static Map<String, Object> getBOJProfile(String bojId) {
		RestTemplate restTemplate = new RestTemplate();
		Map<String, Object> BOJProfile = restTemplate.getForObject(solvedACRoot + "user/show?handle=" + bojId,
			Map.class);
		return BOJProfile;
	}

	public static String getUserTier(String bojId) {
		Map<String, Object> BOJProfile = getBOJProfile(bojId);
		System.out.println(BOJProfile);
		return ParsingUtil.getTier4Level((int)BOJProfile.get("tier"));

	}

	public List<Map<String, Object>> getProblemStats(String handle) {
		RestTemplate restTemplate = new RestTemplate();
		List<Map<String, Object>> result = restTemplate.getForObject(
			solvedACRoot + "user/problem_stats?handle=" + handle,
			List.class);
		for (Map<String, Object> map : result) {
			map.put("tier", ParsingUtil.getTier4Level((int)map.get("level")));
		}
		return result;
	}

}
