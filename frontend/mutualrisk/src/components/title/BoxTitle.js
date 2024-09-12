import React from 'react';
import { Box, Divider, Stack } from '@mui/material';
import { colors } from 'constants/colors';
const BoxTitle = ({ title }) => {
	return (
		<Box>
			<Stack
				spacing={1}
				sx={{
					fontSize: '20px',
					fontWeight: 'bold',
					color: colors.text.sub1,
				}}>
				<Box>{title}</Box>
				<Divider sx={{ borderColor: colors.text.sub1 }} />
			</Stack>
		</Box>
	);
};

export default BoxTitle;
