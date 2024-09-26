import React from 'react';
import AssetRatioPieChart from 'pages/portfolio/detail/asset/AssetRatioPieChart';
import PortfolioAssetList from 'pages/portfolio/rebalance/main/piechart/PortfolioAssetList';
import { Stack } from '@mui/material';

const PortfolioPieChart = () => {
	return (
		<Stack direction={'row'} spacing={1}>
			<AssetRatioPieChart
				sx={{
					minWidth: '500px',
				}}
			/>
			<PortfolioAssetList />
		</Stack>
	);
};

export default PortfolioPieChart;
