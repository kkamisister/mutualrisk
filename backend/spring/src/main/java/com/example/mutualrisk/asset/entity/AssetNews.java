package com.example.mutualrisk.asset.entity;


import org.hibernate.annotations.BatchSize;

import com.example.mutualrisk.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "asset_news")
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class AssetNews extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "news_id")
    private News news;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id")
    private Asset asset;

}
