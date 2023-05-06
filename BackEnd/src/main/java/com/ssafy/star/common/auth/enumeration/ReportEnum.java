package com.ssafy.star.common.auth.enumeration;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum ReportEnum {

    Card("부적절한 카드 내용"),
    USER("부정적인 언행"),
    ETC ("기타"),
    ;


    private final String content;

    ReportEnum(String content) {
        this.content = content;
    };

    public String getContent() {
        return this.content;
    }

    public static List<String> getAllValues() {
        return Arrays.stream(values())
                .map(ReportEnum::getContent)
                .collect(Collectors.toList());
    }
}
