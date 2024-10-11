package com.example.mutualrisk.asset.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRecommendAsset is a Querydsl query type for RecommendAsset
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRecommendAsset extends EntityPathBase<RecommendAsset> {

    private static final long serialVersionUID = -620138713L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRecommendAsset recommendAsset = new QRecommendAsset("recommendAsset");

    public final com.example.mutualrisk.common.entity.QBaseEntity _super = new com.example.mutualrisk.common.entity.QBaseEntity(this);

    public final QAsset asset;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final com.example.mutualrisk.portfolio.entity.QPortfolio portfolio;

    public final NumberPath<Double> returnDiff = createNumber("returnDiff", Double.class);

    public final NumberPath<Double> sharpeRatioDiff = createNumber("sharpeRatioDiff", Double.class);

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final NumberPath<Double> volatilityDiff = createNumber("volatilityDiff", Double.class);

    public QRecommendAsset(String variable) {
        this(RecommendAsset.class, forVariable(variable), INITS);
    }

    public QRecommendAsset(Path<? extends RecommendAsset> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRecommendAsset(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRecommendAsset(PathMetadata metadata, PathInits inits) {
        this(RecommendAsset.class, metadata, inits);
    }

    public QRecommendAsset(Class<? extends RecommendAsset> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.asset = inits.isInitialized("asset") ? new QAsset(forProperty("asset"), inits.get("asset")) : null;
        this.portfolio = inits.isInitialized("portfolio") ? new com.example.mutualrisk.portfolio.entity.QPortfolio(forProperty("portfolio"), inits.get("portfolio")) : null;
    }

}

