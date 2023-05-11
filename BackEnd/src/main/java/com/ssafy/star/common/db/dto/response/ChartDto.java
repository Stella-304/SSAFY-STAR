package com.ssafy.star.common.db.dto.response;

import lombok.Getter;
import lombok.ToString;

import java.util.Map;

@Getter
@ToString
public class ChartDto {

    Map<String, Object[]> chart;

    public ChartDto(Map<String, Object[]> chart) {
        this.chart = chart;
    }
}
