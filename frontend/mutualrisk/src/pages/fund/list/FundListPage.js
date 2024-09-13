import React from 'react';
import FundManagerList from 'pages/fund/list/FundManagerList';
import BoxTitle from 'components/title/BoxTitle';
import { Box, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import FundStockList from './FundStockList';
import { colors } from 'constants/colors';
const FundListPage = () => {
	return (
		<Stack spacing={2} sx={{ backgroundColor: colors.background.primary }}>
			<Stack spacing={1}>
				<BoxTitle title="상위 20개 투자운용사 목록" />
				<FundManagerList />
			</Stack>
			<Grid container sx={{ justifyContent: 'space-between' }}>
				<Grid item xs={5.9}>
					<Stack spacing={1}>
						<FundStockList />
					</Stack>
				</Grid>
				<Grid item xs={5.9}>
					<Stack spacing={1}>
						<FundStockList />
					</Stack>
				</Grid>
			</Grid>
		</Stack>
	);
};

export default FundListPage;
