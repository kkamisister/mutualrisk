import React from 'react';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import FundStockList from './FundStockList';
const FundListPage = ({ topHoldAsset, topBuyAsset }) => {
	return (
		<Grid container sx={{ justifyContent: 'space-between' }}>
			<Grid item xs={5.9}>
				<Stack spacing={1}>
					<FundStockList
						data={topHoldAsset}
						title="보유량 상위 10개 종목"
					/>
				</Stack>
			</Grid>
			<Grid item xs={5.9}>
				<Stack spacing={1}>
					<FundStockList
						data={topBuyAsset}
						title="구매량 상위 10개 종목"
					/>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default FundListPage;
