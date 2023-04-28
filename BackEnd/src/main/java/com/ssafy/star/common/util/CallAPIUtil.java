package com.ssafy.star.common.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.client.RestTemplate;

public class CallAPIUtil {
	static String solvedACRoot = "https://solved.ac/api/v3/";
	static Map<String, Object> emptyBOJProfile;

	static {
		emptyBOJProfile = new HashMap<>();
		emptyBOJProfile.put("tier", 0);
	}

	static Map<String, Object> getBOJProfile(String bojId) {
		RestTemplate restTemplate = new RestTemplate();
		try {
			Map<String, Object> BOJProfile = restTemplate.getForObject(solvedACRoot + "user/show?handle=" + bojId,
				Map.class);
			return BOJProfile;
		} catch (Exception e) {
			// 만약 존재하지 않는 bojId일 경우, emptyBOJProfile을 return해줌.
			return emptyBOJProfile;
		}
	}

	public static String getUserTier(String bojId) {
		Map<String, Object> BOJProfile = getBOJProfile(bojId);
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
