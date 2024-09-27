import React from 'react';
import StockChangeListItem from './StockChangeListItem';
import { Stack } from '@mui/material';

const StockChangeList = () => {
	return (
		<Stack>
			<StockChangeListItem />
			<StockChangeListItem />
			<StockChangeListItem />
			<StockChangeListItem />
		</Stack>
	);
};

export default StockChangeList;
