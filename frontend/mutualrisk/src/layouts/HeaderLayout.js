import React from 'react';
import { Stack } from '@mui/material';
import { colors } from 'constants/colors';
const HeaderLayout = ({ sx }) => {
	return (
		<Stack
			sx={{
				backgroundColor: colors.background.primary,
				zIndex: 1,
				minHeight: '50px',
				borderBottom: `1px solid ${colors.point.stroke}`,
				...sx,
			}}></Stack>
	);
};

export default HeaderLayout;
