package com.example.mutualrisk.common.constants;

public class Constants {

    // sector별로 대표 포트폴리오로 쓸 자산들의 정보를 저장한 리스트
    public static final BenchMark[] SECTOR_BENCHMARK_LIST = {
        new BenchMark(4546, 7),
        new BenchMark(4548, 5),
        new BenchMark(4550, 11),
        new BenchMark(4551, 6),
        new BenchMark(4553, 8),
        new BenchMark(4554, 2),
        new BenchMark(4557, 3),
        new BenchMark(4558, 13),
        new BenchMark(4559, 4),
        new BenchMark(4688, 9),
        new BenchMark(4728, 10),
        new BenchMark(3227,1),
    };

    public static final int SP500_ASSET_ID = 3621;
    public static final int KOSPI_ASSET_ID = 648;
}
