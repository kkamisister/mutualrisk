import React from 'react';
import { Box, Stack } from '@mui/material';
import { colors } from 'constants/colors';
const Title = ({ text, caption, children }) => {
	return (
		<Box>
			<Stack
				direction="row"
				spacing={1}
				sx={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
				<Box
					sx={{
						fontSize: '20px',
						fontWeight: 'bold',
						color: colors.text.main,
					}}>
					{text}
				</Box>
				<Box
					sx={{
						fontSize: '12px',
						color: colors.text.sub1,
					}}>
					{caption}
				</Box>
				{children}
			</Stack>
		</Box>
	);
};

export default Title;
