package com.example.mutualrisk.asset.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mutualrisk.asset.entity.News;

public interface NewsRepository extends JpaRepository<News, Integer> {
}
