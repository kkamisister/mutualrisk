package com.example.mutualrisk.asset.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.mutualrisk.common.entity.BaseEntity;
import com.example.mutualrisk.common.util.UnixTimestampConverter;

@Table(name = "asset_history")
@Entity
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AssetHistory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id")
    private Asset asset;

    @Column(name = "date")
    @Convert(converter = UnixTimestampConverter.class)
    private LocalDateTime date;

    @Column(name = "price", nullable = false)
    private Double price;
}
