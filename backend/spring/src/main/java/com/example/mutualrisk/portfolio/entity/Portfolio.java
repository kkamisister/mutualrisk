package com.example.mutualrisk.portfolio.entity;

import java.util.List;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "portfolio")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Portfolio {

	@Id @Field(value = "_id",targetType = FieldType.OBJECT_ID)
	private String id;
	private String type;
	private Integer userId;
	private List<PortfolioAsset> asset;
}
