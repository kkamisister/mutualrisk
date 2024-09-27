package com.example.mutualrisk.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PerformanceMeasure {
    PROFIT("이익");
    private final String description;
}
