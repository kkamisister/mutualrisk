import React from 'react';
import TitleDivider from 'components/title/TitleDivider';
import { Stack } from '@mui/material';
import { colors } from 'constants/colors';
import StockAddBox from 'pages/portfolio/detail/StockAddBox';
import PortfolioSummaryList from 'pages/portfolio/detail/summary/PortfolioSummaryList';
import AssetRatio from 'pages/portfolio/detail/asset/AssetRatio';
import EfficientFrontier from 'pages/portfolio/detail/graph/EfficientFrontier';
import BackTesting from 'pages/portfolio/detail/graph/BackTesting';
import EquitySectors from 'pages/portfolio/detail/graph/EquitySectors';
import MonthlyReturns from 'pages/portfolio/detail/graph/MonthlyReturns';

const PortfolioDetailPage = () => {
	return (
		<Stack spacing={6} sx={{ backgroundColor: colors.background.primary }}>
			<StockAddBox />

			{/* 포트폴리오 현황 요약 */}
			<Stack spacing={2}>
				<TitleDivider
					text="포트폴리오 현황 요약"
					caption="(최근 업데이트: 2024/12/31)"
				/>
				<PortfolioSummaryList />
			</Stack>

			{/* 기타 그래프 섹션 */}
			{/* 보유 자산 비율 */}
			<Stack spacing={3}>
				<AssetRatio />
			</Stack>
			{/* Efficien Frontier */}
			<Stack spacing={3}>
				<EfficientFrontier />
			</Stack>
			<Stack spacing={3}>
				<BackTesting />
			</Stack>
			<Stack spacing={3}>
				<EquitySectors />
			</Stack>
			<Stack spacing={3}>
				<MonthlyReturns />
			</Stack>
		</Stack>
	);
};

export default PortfolioDetailPage;
