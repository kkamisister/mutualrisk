import React from 'react';
import { Stack } from '@mui/material';
import { colors } from 'constants/colors';
import StockNewsItemCard from 'components/card/StockNewsItemCard';
import NewsSkeletonCard from 'components/card/NewsSkeletonCard';

const StockNewsList = ({ isLoading, newsList }) => {
	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '15px',
				borderRadius: '10px',
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			{isLoading &&
				Array(10)
					.fill(0)
					.map((_, index) => {
						return <NewsSkeletonCard key={index} />;
					})}
			{newsList.map((news, index) => (
				<StockNewsItemCard key={index} news={news} />
			))}
		</Stack>
	);
};

export default StockNewsList;
