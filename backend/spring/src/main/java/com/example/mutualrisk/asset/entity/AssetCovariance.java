package com.example.mutualrisk.asset.entity;

import com.example.mutualrisk.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "asset_covariance_final")
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class AssetCovariance extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id_1")
    private Asset asset1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id_2")
    private Asset asset2;

    @Column(name = "covariance")
    Double covariance;
}
