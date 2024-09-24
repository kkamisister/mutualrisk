package com.example.mutualrisk.fund.entity;

import java.util.List;

import org.hibernate.annotations.Index;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection="13f")
@Getter @Setter
@NoArgsConstructor
public class Fund {

	@Id @Field(value = "_id",targetType = FieldType.OBJECT_ID)
	private String id;
	// @Field("type")
	private String type;
	// @Field("name")
	private String name;
	// @Field("company")
	private String company;

	private List<Item> asset;

	private String submissionDate;

	@Indexed
	private long valueOfHoldings;

}
