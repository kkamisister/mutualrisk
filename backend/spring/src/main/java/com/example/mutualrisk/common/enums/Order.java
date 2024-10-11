package com.example.mutualrisk.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Order {
    ASC("오름차순"),
    DESC("내림차순");

    private final String explain;
}
