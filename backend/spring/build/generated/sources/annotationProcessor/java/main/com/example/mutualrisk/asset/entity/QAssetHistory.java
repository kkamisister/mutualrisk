package com.example.mutualrisk.asset.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAssetHistory is a Querydsl query type for AssetHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAssetHistory extends EntityPathBase<AssetHistory> {

    private static final long serialVersionUID = -1928094761L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAssetHistory assetHistory = new QAssetHistory("assetHistory");

    public final com.example.mutualrisk.common.entity.QBaseEntity _super = new com.example.mutualrisk.common.entity.QBaseEntity(this);

    public final QAsset asset;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final DateTimePath<java.time.LocalDateTime> date = createDateTime("date", java.time.LocalDateTime.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final NumberPath<Double> price = createNumber("price", Double.class);

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QAssetHistory(String variable) {
        this(AssetHistory.class, forVariable(variable), INITS);
    }

    public QAssetHistory(Path<? extends AssetHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAssetHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAssetHistory(PathMetadata metadata, PathInits inits) {
        this(AssetHistory.class, metadata, inits);
    }

    public QAssetHistory(Class<? extends AssetHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.asset = inits.isInitialized("asset") ? new QAsset(forProperty("asset"), inits.get("asset")) : null;
    }

}

