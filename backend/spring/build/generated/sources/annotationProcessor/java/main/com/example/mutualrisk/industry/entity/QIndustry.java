package com.example.mutualrisk.industry.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QIndustry is a Querydsl query type for Industry
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QIndustry extends EntityPathBase<Industry> {

    private static final long serialVersionUID = -1626074413L;

    public static final QIndustry industry = new QIndustry("industry");

    public final com.example.mutualrisk.common.entity.QBaseEntity _super = new com.example.mutualrisk.common.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath name = createString("name");

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QIndustry(String variable) {
        super(Industry.class, forVariable(variable));
    }

    public QIndustry(Path<? extends Industry> path) {
        super(path.getType(), path.getMetadata());
    }

    public QIndustry(PathMetadata metadata) {
        super(Industry.class, metadata);
    }

}

