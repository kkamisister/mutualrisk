import * as React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { colors } from 'constants/colors';

const CustomButton = styled(Button)(() => ({
	width: '90px',
	height: '30px',
	borderRadius: '60px',
	backgroundColor: colors.main.primary100,
	border: `1px solid ${colors.main.primary400}`,
	color: colors.text.sub2,
	cursor: 'pointer',
	'&:hover': {
		backgroundColor: colors.main.primary400,
		color: colors.background.white,
	},
}));

export default function BasicButton({ children, sx, ...props }) {
	return (
		<CustomButton sx={{ ...sx }} {...props}>
			{children}
		</CustomButton>
	);
}
