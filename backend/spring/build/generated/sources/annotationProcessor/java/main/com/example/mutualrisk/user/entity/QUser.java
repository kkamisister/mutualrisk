package com.example.mutualrisk.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 1649072813L;

    public static final QUser user = new QUser("user");

    public final com.example.mutualrisk.common.entity.QBaseEntity _super = new com.example.mutualrisk.common.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath email = createString("email");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath image = createString("image");

    public final ListPath<com.example.mutualrisk.asset.entity.InterestAsset, com.example.mutualrisk.asset.entity.QInterestAsset> interestAssetList = this.<com.example.mutualrisk.asset.entity.InterestAsset, com.example.mutualrisk.asset.entity.QInterestAsset>createList("interestAssetList", com.example.mutualrisk.asset.entity.InterestAsset.class, com.example.mutualrisk.asset.entity.QInterestAsset.class, PathInits.DIRECT2);

    public final StringPath nickname = createString("nickname");

    public final StringPath oauthId = createString("oauthId");

    public final ListPath<com.example.mutualrisk.portfolio.entity.Portfolio, com.example.mutualrisk.portfolio.entity.QPortfolio> portfolioList = this.<com.example.mutualrisk.portfolio.entity.Portfolio, com.example.mutualrisk.portfolio.entity.QPortfolio>createList("portfolioList", com.example.mutualrisk.portfolio.entity.Portfolio.class, com.example.mutualrisk.portfolio.entity.QPortfolio.class, PathInits.DIRECT2);

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

