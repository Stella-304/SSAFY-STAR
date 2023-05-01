package com.ssafy.star.common.db.dto.request;

import io.swagger.models.auth.In;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@NoArgsConstructor
@ToString
public class SearchConditionReqDto {
    List<Integer> ban;
    List<Integer> generation;
    List<String> campus;
    List<String> company;
    List<String> bojTier;
    List<String> track;
    List<String> companyAssetSize;
    // 성운 플래그.
    String starCloudFlag;
    //교집합인지 여부
    boolean isIntersection;
}

