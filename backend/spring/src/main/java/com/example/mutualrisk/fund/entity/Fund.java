package com.example.mutualrisk.fund.entity;


import java.util.List;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;


import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Document(collection="13f")
@Getter
@NoArgsConstructor
public class Fund {

	@Id @Field(value = "_id",targetType = FieldType.OBJECT_ID)
	private String id;
	private String type;
	private String name;
	private String company;

	private List<Item> asset;
	private String submissionDate;
	private long valueOfHoldings;

}
