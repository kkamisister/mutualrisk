package com.example.mutualrisk.common.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QExchangeRates is a Querydsl query type for ExchangeRates
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QExchangeRates extends EntityPathBase<ExchangeRates> {

    private static final long serialVersionUID = 140692206L;

    public static final QExchangeRates exchangeRates = new QExchangeRates("exchangeRates");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final NumberPath<Double> bkpr = createNumber("bkpr", Double.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath curNm = createString("curNm");

    public final StringPath curUnit = createString("curUnit");

    public final NumberPath<Double> dbr = createNumber("dbr", Double.class);

    public final DatePath<java.time.LocalDate> exRateDate = createDate("exRateDate", java.time.LocalDate.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final NumberPath<Double> kftcBkpr = createNumber("kftcBkpr", Double.class);

    public final NumberPath<Double> kftcDealBasR = createNumber("kftcDealBasR", Double.class);

    //inherited
    public final BooleanPath status = _super.status;

    public final NumberPath<Double> tenDdEfeeR = createNumber("tenDdEfeeR", Double.class);

    public final NumberPath<Double> ttb = createNumber("ttb", Double.class);

    public final NumberPath<Double> tts = createNumber("tts", Double.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final NumberPath<Double> yyEfeeR = createNumber("yyEfeeR", Double.class);

    public QExchangeRates(String variable) {
        super(ExchangeRates.class, forVariable(variable));
    }

    public QExchangeRates(Path<? extends ExchangeRates> path) {
        super(path.getType(), path.getMetadata());
    }

    public QExchangeRates(PathMetadata metadata) {
        super(ExchangeRates.class, metadata);
    }

}

