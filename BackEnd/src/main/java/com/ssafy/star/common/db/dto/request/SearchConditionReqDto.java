package com.ssafy.star.common.db.dto.request;

import io.swagger.models.auth.In;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@ToString
public class SearchConditionReqDto {
    List<String> ban;
    List<String> generation;
    List<String> campus;
    List<String> company;
    List<String> bojTier;
    List<String> track;
    List<String> major;
    List<String> role;
    List<String> swTier;
    // 성운 플래그.
    String starCloudFlag;
    //교집합인지 여부
    boolean isIntersection;

    public Map<String,List<String>> getlists(){
        HashMap<String,List<String>> map=new HashMap<>();
        map.put("ban",ban);
        map.put("generation",generation);
        map.put("campus",campus);
        map.put("company",company);
        map.put("bojTier",bojTier);
        map.put("track",track);
        map.put("major",major);
        map.put("role",role);
        map.put("swTier",swTier);
        return map;
    }
}

