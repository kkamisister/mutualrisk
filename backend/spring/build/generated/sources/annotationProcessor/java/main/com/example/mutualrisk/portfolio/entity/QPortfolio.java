package com.example.mutualrisk.portfolio.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPortfolio is a Querydsl query type for Portfolio
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPortfolio extends EntityPathBase<Portfolio> {

    private static final long serialVersionUID = 184637821L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPortfolio portfolio = new QPortfolio("portfolio");

    public final com.example.mutualrisk.common.entity.QBaseEntity _super = new com.example.mutualrisk.common.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final ListPath<com.example.mutualrisk.asset.entity.RecommendAsset, com.example.mutualrisk.asset.entity.QRecommendAsset> recommendAssetList = this.<com.example.mutualrisk.asset.entity.RecommendAsset, com.example.mutualrisk.asset.entity.QRecommendAsset>createList("recommendAssetList", com.example.mutualrisk.asset.entity.RecommendAsset.class, com.example.mutualrisk.asset.entity.QRecommendAsset.class, PathInits.DIRECT2);

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.example.mutualrisk.user.entity.QUser user;

    public QPortfolio(String variable) {
        this(Portfolio.class, forVariable(variable), INITS);
    }

    public QPortfolio(Path<? extends Portfolio> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPortfolio(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPortfolio(PathMetadata metadata, PathInits inits) {
        this(Portfolio.class, metadata, inits);
    }

    public QPortfolio(Class<? extends Portfolio> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.example.mutualrisk.user.entity.QUser(forProperty("user")) : null;
    }

}

