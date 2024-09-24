package com.example.mutualrisk.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 각 자산들이 속하는 마켓을 나타내는 enum
 */
@Getter
@RequiredArgsConstructor
public enum Market {
    ETF("ETF"),
    KOSDAQ("코스닥"),
    KOSPI("코스피"),
    KOSDAQ_GLOBAL("코스닥글로벌"),
    KONEX("코넥스"),
    NASDAQ("나스닥"),
    AMEX("아멕스"),
    NYSE("뉴욕증권거래소")
    ;

    private final String explain;
}
