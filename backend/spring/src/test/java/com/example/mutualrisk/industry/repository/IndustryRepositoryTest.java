package com.example.mutualrisk.industry.repository;

import com.example.mutualrisk.industry.entity.Industry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
@SpringBootTest
class IndustryRepositoryTest {

    @Autowired
    private IndustryRepository industryRepository;

    @BeforeEach
    void setUp() {
        // 기존 데이터 삭제
        industryRepository.deleteAll();

        industryRepository.save(Industry.builder()
                .name("someIndustry1")
                .build());

        industryRepository.save(Industry.builder()
                .name("someIndustry2")
                .build());
    }
    
    @Test
    void testQueryDsl() {

        // querydsl을 이용하여 Entity를 제대로 받아오는지 확인
        Industry someIndustry1 = industryRepository.findIndustryByName("someIndustry1");
        assertNotNull(someIndustry1);

        System.out.println("someIndustry1.getId() = " + someIndustry1.getId());
        System.out.println("someIndustry1.getName() = " + someIndustry1.getName());
    }


    // baseEntity 기능 정상 작동 확인
    @Test
    void testBaseEntity() {
        Industry someIndustry1 = industryRepository.findById(1);

        // status, createdAt, updatedAt이 정상적으로 초기화되었는지 확인
        assertNotNull(someIndustry1.getStatus());
        assertNotNull(someIndustry1.getCreatedAt());
        assertNotNull(someIndustry1.getUpdatedAt());

        // 출력
        System.out.println("someIndustry1.getStatus() = " + someIndustry1.getStatus());
        System.out.println("someIndustry1.getCreatedAt() = " + someIndustry1.getCreatedAt());
        System.out.println("someIndustry1.getUpdatedAt() = " + someIndustry1.getUpdatedAt());
    }
}