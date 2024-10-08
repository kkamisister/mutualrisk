package com.example.mutualrisk.portfolio.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import com.example.mutualrisk.portfolio.dto.PortfolioResponse.*;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "portfolio")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Portfolio {
	@Id @Field(value = "_id",targetType = FieldType.OBJECT_ID)
	private String id;
	private String type;
	private String name;
	@Field("userId")
	private Integer userId;
	private Integer version;
	private Boolean isActive;
	private LocalDateTime createdAt;
	private LocalDateTime deletedAt;

	private List<PortfolioAsset> asset;
	private List<Double> lowerBound;
	private List<Double> upperBound;
	private List<Double> weights;
	private PortfolioPerformance fictionalPerformance;
	private List<FrontierPoint> frontierPoints;
	private List<RecommendAsset> recommendAssets;

	/**
	 * 포트폴리오의 구성 자산 목록을 받아올 때, id순으로 정렬시키는 로직 추가
	 * 해당하는 asset을 asset Entity에서 조회할 때, 순서가 동일하도록 하기 위함
	 */
	public List<PortfolioAsset> getAsset() {
		// 리스트 복사본 생성
		List<PortfolioAsset> sortedList = new ArrayList<>(this.asset);

		// 복사된 리스트를 정렬
		sortedList.sort(Comparator.comparingInt(PortfolioAsset::getAssetId));

		// 정렬된 리스트 반환
		return sortedList;
	}

	public List<RecommendAsset> getRecommendAssets() {
		if (this.recommendAssets == null) {
			return new ArrayList<>();
		}

		List<RecommendAsset> sortedList = new ArrayList<>(this.recommendAssets);

		sortedList.sort(Comparator.comparingInt(RecommendAsset::getAssetId));

		return sortedList;
	}
}
