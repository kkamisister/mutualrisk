import React from 'react';
import { Box, Divider, Stack } from '@mui/material';
import { colors } from 'constants/colors';

const TitleDivider = ({ children, text, caption }) => {
	return (
		<Box>
			<Stack spacing={1}>
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
				<Divider sx={{ borderColor: colors.text.sub1 }} />
			</Stack>
		</Box>
	);
};

export default TitleDivider;
