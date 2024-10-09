import React, { useState, useEffect } from 'react';
import { Stack, Pagination } from '@mui/material';
import { colors } from 'constants/colors';
import StockNewsListItem from './StockNewsListItem';
import StockNewsListEmpty from './StockNewsListEmpty';
const StockNewsList = ({ newsList }) => {
	const pageItemCount = 5;
	const [page, setPage] = useState(1);
	const [currentNewsPageList, setCurrentNewsPageList] = useState(
		newsList.slice((pageItemCount - 1) * 5, (pageItemCount - 1) * 5 + 5)
	);

	useEffect(() => {
		setCurrentNewsPageList(() =>
			newsList.slice((page - 1) * 5, (page - 1) * 5 + 5)
		);
		console.log(newsList.slice((page - 1) * 5, (page - 1) * 5 + 5));
	}, [page, newsList]);

	const handlePageChange = (event, value) => {
		setPage(value);
	};

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
			{currentNewsPageList.length === 0 && <StockNewsListEmpty />}
			{currentNewsPageList.map(news => (
				<StockNewsListItem news={news} />
			))}
			<Pagination
				count={newsList.length / pageItemCount}
				page={page}
				onChange={handlePageChange}
			/>
		</Stack>
	);
};

export default StockNewsList;
