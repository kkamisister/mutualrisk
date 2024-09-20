import React from 'react';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import FundStockList from './FundStockList';

const FundListPage = () => {
	return (
		<Grid container sx={{ justifyContent: 'space-between' }}>
			<Grid item xs={5.9}>
				<Stack spacing={1}>
					<FundStockList title="보유량 TOP 30 종목" />
				</Stack>
			</Grid>
			<Grid item xs={5.9}>
				<Stack spacing={1}>
					<FundStockList title="구매량 TOP 30 종목" />
				</Stack>
			</Grid>
		</Grid>
	);
};

export default FundListPage;
