package com.example.mutualrisk.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TimeInterval {
    DAY("일"),
    WEEK("주"),
    MONTH("월"),
    YEAR("년");
    private final String description;
}
