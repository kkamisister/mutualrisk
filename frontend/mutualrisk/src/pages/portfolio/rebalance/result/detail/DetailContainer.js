import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { colors } from 'constants/colors';

const DetailContainer = ({ title, children, ...props }) => {
	return (
		<Stack spacing={1} direction={'column'} width={'100%'} height={'100%'}>
			<Box
				sx={{
					backgroundColor: '#B6B5D0',
					borderRadius: '10px',
					padding: '10px',
				}}>
				<Typography
					fontSize={18}
					color={'white'}
					textAlign={'center'}
					noWrap>
					{title}
				</Typography>
			</Box>
			<Box
				sx={{
					backgroundColor: colors.background.box,
					borderRadius: '20px',
					height: '300px',
					padding: '20px',
				}}>
				{children}
			</Box>
		</Stack>
	);
};

export default DetailContainer;
