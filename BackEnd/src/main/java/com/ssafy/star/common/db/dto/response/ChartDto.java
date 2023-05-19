package com.ssafy.star.common.db.dto.response;

import lombok.Getter;
import lombok.ToString;

import java.util.List;
import java.util.Map;

@Getter
@ToString
public class ChartDto {

    List<Object[]> chart;

    public ChartDto(List<Object[]> chart) {
        this.chart = chart;
    }
}
