package com.example.mutualrisk.asset.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QInterestAsset is a Querydsl query type for InterestAsset
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInterestAsset extends EntityPathBase<InterestAsset> {

    private static final long serialVersionUID = -1547431949L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QInterestAsset interestAsset = new QInterestAsset("interestAsset");

    public final com.example.mutualrisk.common.entity.QBaseEntity _super = new com.example.mutualrisk.common.entity.QBaseEntity(this);

    public final QAsset asset;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.example.mutualrisk.user.entity.QUser user;

    public QInterestAsset(String variable) {
        this(InterestAsset.class, forVariable(variable), INITS);
    }

    public QInterestAsset(Path<? extends InterestAsset> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QInterestAsset(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QInterestAsset(PathMetadata metadata, PathInits inits) {
        this(InterestAsset.class, metadata, inits);
    }

    public QInterestAsset(Class<? extends InterestAsset> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.asset = inits.isInitialized("asset") ? new QAsset(forProperty("asset"), inits.get("asset")) : null;
        this.user = inits.isInitialized("user") ? new com.example.mutualrisk.user.entity.QUser(forProperty("user")) : null;
    }

}

