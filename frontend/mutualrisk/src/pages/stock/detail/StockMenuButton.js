import React from 'react';
import { Button } from '@mui/material';
import { colors } from 'constants/colors';
const StockMenuButton = ({ label, value, disabled, onChange, selected }) => {
	return (
		<Button
			sx={{
				backgroundColor: selected
					? colors.background.white
					: colors.background.primary,
				width: 'fit-content',
				borderRadius: '100px',
				color: colors.text.main,
				paddingLeft: '20px',
				paddingRight: '20px',
				fontWeight: 500,
				fontSize: '13px',
			}}
			disabled={disabled}
			onClick={() => onChange(value)}>
			{label}
		</Button>
	);
};

export default StockMenuButton;
