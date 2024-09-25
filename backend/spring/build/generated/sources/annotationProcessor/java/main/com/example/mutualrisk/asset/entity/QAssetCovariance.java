package com.example.mutualrisk.asset.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAssetCovariance is a Querydsl query type for AssetCovariance
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAssetCovariance extends EntityPathBase<AssetCovariance> {

    private static final long serialVersionUID = 1077099706L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAssetCovariance assetCovariance = new QAssetCovariance("assetCovariance");

    public final com.example.mutualrisk.common.entity.QBaseEntity _super = new com.example.mutualrisk.common.entity.QBaseEntity(this);

    public final QAsset asset1;

    public final QAsset asset2;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QAssetCovariance(String variable) {
        this(AssetCovariance.class, forVariable(variable), INITS);
    }

    public QAssetCovariance(Path<? extends AssetCovariance> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAssetCovariance(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAssetCovariance(PathMetadata metadata, PathInits inits) {
        this(AssetCovariance.class, metadata, inits);
    }

    public QAssetCovariance(Class<? extends AssetCovariance> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.asset1 = inits.isInitialized("asset1") ? new QAsset(forProperty("asset1"), inits.get("asset1")) : null;
        this.asset2 = inits.isInitialized("asset2") ? new QAsset(forProperty("asset2"), inits.get("asset2")) : null;
    }

}

