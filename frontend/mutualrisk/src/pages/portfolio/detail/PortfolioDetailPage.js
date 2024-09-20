import React from 'react';
import BoxTitle from 'components/title/BoxTitle';
import { Avatar, Box, Stack } from '@mui/material';
import { colors } from 'constants/colors';
import StockAddBox from 'pages/portfolio/detail/StockAddBox';
import PortfolioSummaryList from 'pages/portfolio/detail/PortfolioSummaryList';

const PortfolioDetailPage = () => {
	return (
		<Stack spacing={2} sx={{ backgroundColor: colors.background.primary }}>
			<StockAddBox />
			<Stack spacing={1}>
				<BoxTitle title="포트폴리오 현황 요약" />
				<PortfolioSummaryList />
			</Stack>
			<Stack spacing={1}>
				<BoxTitle title="보유 자산 비율" />
			</Stack>
			<Stack spacing={1}>
				<BoxTitle title="그래프1" />
			</Stack>
			<Stack spacing={1}>
				<BoxTitle title="그래프2" />
			</Stack>
		</Stack>
	);
};

export default PortfolioDetailPage;
