import React from 'react';
import BoxTitle from 'components/title/BoxTitle';
import TitleDivider from 'components/title/TitleDivider';
import { Stack } from '@mui/material';
import { colors } from 'constants/colors';
import StockAddBox from 'pages/portfolio/detail/StockAddBox';
import PortfolioSummaryList from 'pages/portfolio/detail/summary/PortfolioSummaryList';
import AssetRatio from 'pages/portfolio/detail/asset/AssetRatio';

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
			<Stack spacing={3}>
				<BoxTitle title="보유 자산 비율" />
				<AssetRatio />
			</Stack>
			<Stack spacing={3}>
				<BoxTitle title="그래프1" />
				<AssetRatio />
			</Stack>
			<Stack spacing={3}>
				<BoxTitle title="그래프2" />
				<AssetRatio />
			</Stack>
		</Stack>
	);
};

export default PortfolioDetailPage;
