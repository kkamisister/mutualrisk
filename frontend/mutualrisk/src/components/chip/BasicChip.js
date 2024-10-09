import React from 'react';
import { Chip } from '@mui/material';
import { colors } from 'constants/colors';

const BasicChip = ({ label }) => {
	return (
		<Chip
			sx={{
				flex: 1,
				fontSize: '14px',
				fontWeight: '540',
				bgcolor: colors.main.primary600,
				color: colors.text.white,
			}}
			label={label} // 전달된 label 값
		/>
	);
};

export default BasicChip;
