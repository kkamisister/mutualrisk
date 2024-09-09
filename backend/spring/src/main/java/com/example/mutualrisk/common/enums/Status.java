package com.example.mutualrisk.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Status {
    ACTIVE("활성화"),
    DELETE("삭제");

    private final String status;
}
