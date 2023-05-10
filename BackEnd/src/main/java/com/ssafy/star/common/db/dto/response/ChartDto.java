package com.ssafy.star.common.db.dto.response;

import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;
import java.util.Map;

@Getter
@ToString
public class ChartDto {

    Map<String, Integer> chart = new HashMap<>();

    public ChartDto(Map<String, Integer> chart) {
        this.chart = chart;
    }
}
