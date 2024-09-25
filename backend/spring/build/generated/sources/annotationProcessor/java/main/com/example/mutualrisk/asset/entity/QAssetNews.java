package com.example.mutualrisk.asset.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAssetNews is a Querydsl query type for AssetNews
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAssetNews extends EntityPathBase<AssetNews> {

    private static final long serialVersionUID = 1085133424L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAssetNews assetNews = new QAssetNews("assetNews");

    public final com.example.mutualrisk.common.entity.QBaseEntity _super = new com.example.mutualrisk.common.entity.QBaseEntity(this);

    public final QAsset asset;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final QNews news;

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QAssetNews(String variable) {
        this(AssetNews.class, forVariable(variable), INITS);
    }

    public QAssetNews(Path<? extends AssetNews> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAssetNews(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAssetNews(PathMetadata metadata, PathInits inits) {
        this(AssetNews.class, metadata, inits);
    }

    public QAssetNews(Class<? extends AssetNews> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.asset = inits.isInitialized("asset") ? new QAsset(forProperty("asset"), inits.get("asset")) : null;
        this.news = inits.isInitialized("news") ? new QNews(forProperty("news")) : null;
    }

}

