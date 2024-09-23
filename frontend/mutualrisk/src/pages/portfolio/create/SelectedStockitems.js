import React from 'react';
import { Box, Button } from '@mui/material';

const SelectedStockItems = ({ onConfirm }) => {
	return (
		<Box>
			<Box>담은 종목</Box>
			<Button variant="contained" onClick={onConfirm}>
				확인
			</Button>
		</Box>
	);
};

export default SelectedStockItems;
