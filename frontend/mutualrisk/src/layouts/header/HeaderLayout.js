import React from 'react';
import { Stack } from '@mui/material';
import { colors } from 'constants/colors';
import StockSearchBar from './StockSearchBar';
const HeaderLayout = ({ sx }) => {
	return (
		<Stack
			direction="row"
			sx={{
				backgroundColor: colors.background.primary,
				zIndex: 1,
				minHeight: '60px',
				borderBottom: `1px solid ${colors.point.stroke}`,
				justifyContent: 'center',
				alignItems: 'center',
				...sx,
			}}>
			<StockSearchBar />
		</Stack>
	);
};

export default HeaderLayout;
