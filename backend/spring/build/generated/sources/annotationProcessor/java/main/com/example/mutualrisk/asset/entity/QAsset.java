package com.example.mutualrisk.asset.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAsset is a Querydsl query type for Asset
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAsset extends EntityPathBase<Asset> {

    private static final long serialVersionUID = 2052069885L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAsset asset = new QAsset("asset");

    public final com.example.mutualrisk.common.entity.QBaseEntity _super = new com.example.mutualrisk.common.entity.QBaseEntity(this);

    public final StringPath code = createString("code");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Double> expectedReturn = createNumber("expectedReturn", Double.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath imageName = createString("imageName");

    public final StringPath imagePath = createString("imagePath");

    public final com.example.mutualrisk.industry.entity.QIndustry industry;

    public final EnumPath<com.example.mutualrisk.common.enums.Market> market = createEnum("market", com.example.mutualrisk.common.enums.Market.class);

    public final StringPath name = createString("name");

    public final EnumPath<Region> region = createEnum("region", Region.class);

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QAsset(String variable) {
        this(Asset.class, forVariable(variable), INITS);
    }

    public QAsset(Path<? extends Asset> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAsset(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAsset(PathMetadata metadata, PathInits inits) {
        this(Asset.class, metadata, inits);
    }

    public QAsset(Class<? extends Asset> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.industry = inits.isInitialized("industry") ? new com.example.mutualrisk.industry.entity.QIndustry(forProperty("industry")) : null;
    }

}

