import React from 'react';
import { Box, Divider, Stack } from '@mui/material';
import FundStockListItem from './FundStockListItem';
import { colors } from 'constants/colors';
import FundStockBarChart from './FundStockBarChart';
const FundStockList = ({ title, data }) => {
	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '20px',
				borderRadius: '20px',
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			<Box
				sx={{
					fontSize: '20px',
					fontWeight: 'bold',
					color: colors.text.main,
				}}>
				{'보유량 TOP 30 종목'}
			</Box>
			<FundStockBarChart />
			<FundStockListItem />
			<FundStockListItem />
			<FundStockListItem />
			<FundStockListItem />
			<FundStockListItem />
			<FundStockListItem />
			<FundStockListItem />
			<FundStockListItem />
		</Stack>
	);
};

export default FundStockList;
