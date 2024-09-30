import React from 'react';
import { Chip } from '@mui/material';
import { colors } from 'constants/colors';

const BasicChip = ({ label }) => {
	return (
		<Chip
			sx={{
				flex: 1,
				fontSize: '16px',
				fontWeight: 'bold',
				bgcolor: colors.main.primary100,
			}}
			label={label} // 전달된 label 값
		/>
	);
};

export default BasicChip;
