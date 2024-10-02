import React from 'react';
import TitleDivider from 'components/title/TitleDivider';
import Title from 'components/title/Title';
import { Stack } from '@mui/material';
import { colors } from 'constants/colors';
import StockAddBox from 'pages/portfolio/detail/StockAddBox';
import PortfolioSummaryList from 'pages/portfolio/detail/summary/PortfolioSummaryList';
import AssetRatio from 'pages/portfolio/detail/asset/AssetRatio';
import EfficientFrontier from 'pages/portfolio/detail/graph/EfficientFrontier';
import BackTesting from 'pages/portfolio/detail/graph/BackTesting';
import EquitySectors from 'pages/portfolio/detail/graph/EquitySectors';
import MonthlyReturns from 'pages/portfolio/detail/graph/MonthlyReturns';
import WidgetContainer from 'components/container/WidgetConatiner';

const PortfolioDetailPage = () => {
	return (
		<Stack spacing={2} sx={{ backgroundColor: colors.background.primary }}>
			<TitleDivider text="내 포트폴리오" />
			<StockAddBox />

			{/* 포트폴리오 현황 요약 */}
			<WidgetContainer sx={{ backgroundColor: colors.main.primary100 }}>
				<Title
					text="포트폴리오 현황 요약"
					caption="(최근 업데이트: 2024/12/31)"
				/>
				<PortfolioSummaryList />
			</WidgetContainer>
			<AssetRatio />
			<EfficientFrontier />
			<BackTesting />
			<EquitySectors />
			<MonthlyReturns />
		</Stack>
	);
};

export default PortfolioDetailPage;
