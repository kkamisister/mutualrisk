import React from 'react';
import { Stack, Box } from '@mui/material';
import PortfolioPieChart from 'pages/portfolio/rebalance/main/piechart/PortfolioPieChart';
import PortfolioSummary from 'pages/portfolio/rebalance/main/summary/PortfolioSummary';

const CurrentPortfolio = () => {
	return (
		<Stack
			direction={'row'}
			spacing={10}
			sx={{ display: 'flex', justifyContent: 'space-between' }}>
			<PortfolioPieChart />
			<PortfolioSummary />
		</Stack>
	);
};

export default CurrentPortfolio;
