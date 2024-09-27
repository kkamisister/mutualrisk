import React from 'react';
import { Stack } from '@mui/material';
import { colors } from 'constants/colors';
import TitleDivider from 'components/title/TitleDivider';
import RebalanceDetail from 'pages/portfolio/rebalance/result/detail/RebalanceDetail';
import StockChangeList from 'pages/portfolio/rebalance/result/stockchange/StockChangeList';
import BackTestChart from 'pages/portfolio/rebalance/result/backtest/BackTestChart';

const RebalanceResultPage = () => {
	return (
		<Stack spacing={2} sx={{ backgroundColor: colors.background.pcrimary }}>
			<Stack spacing={1}>
				<TitleDivider text="포트폴리오 리밸런싱" />
				<RebalanceDetail />
			</Stack>
			<Stack spacing={1}>
				<TitleDivider text="종목별 보유량 변화" />
				<StockChangeList />
			</Stack>
			<Stack spacing={1}>
				<TitleDivider text="백테스팅" />
				<BackTestChart />
			</Stack>
		</Stack>
	);
};

export default RebalanceResultPage;
