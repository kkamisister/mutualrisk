import React from 'react';
import { Stack } from '@mui/material';
import { colors } from 'constants/colors';
import StockNewsListItem from './StockNewsListItem';
import StockNewsListEmpty from './StockNewsListEmpty';
const StockNewsList = ({ newsList }) => {
	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '15px',
				borderRadius: '10px',
				border: `solid 1px ${colors.point.stroke}`,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			{newsList.length === 0 && <StockNewsListEmpty />}
			{newsList.map(news => (
				<StockNewsListItem news={news} />
			))}
		</Stack>
	);
};

export default StockNewsList;
