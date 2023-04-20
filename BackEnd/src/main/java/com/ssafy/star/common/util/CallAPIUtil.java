package com.ssafy.star.common.util;

import java.util.List;
import java.util.Map;

import org.springframework.web.client.RestTemplate;

public class CallAPIUtil {
	static String solvedACRoot = "https://solved.ac/api/v3/";

	static Map<String, Object> getBOJProfile(String handle) {
		RestTemplate restTemplate = new RestTemplate();
		Map<String, Object> BOJProfile = restTemplate.getForObject(solvedACRoot + "user/show?handle=" + handle,
			Map.class);
		return BOJProfile;
	}

	public static String getUserTier(String handle) {
		Map<String, Object> BOJProfile = getBOJProfile(handle);
		return ParsingUtil.getTier4Level((int)BOJProfile.get("level"));

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
