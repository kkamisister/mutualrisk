package com.example.mutualrisk.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderCondition {
    NAME("이름순"),
    RETURN("수익률순"),
    PRICE("가격순");

    private final String explain;
}
