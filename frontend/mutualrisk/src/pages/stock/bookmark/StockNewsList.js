import React from 'react';
import { Stack } from '@mui/material';
import { colors } from 'constants/colors';
import StockNewsListItem from './StockNewsListItem';
const StockNewsList = ({ newsList }) => {
	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '15px',
				borderRadius: '10px',
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			{newsList.map(news => (
				<StockNewsListItem news={news} />
			))}
		</Stack>
	);
};

export default StockNewsList;
