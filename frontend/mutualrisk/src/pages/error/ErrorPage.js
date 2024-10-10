import { Stack, Box } from '@mui/material';
import { colors } from 'constants/colors';
import React from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
const ErrorPage = ({ message }) => {
	console.log('message', message);
	return (
		<Stack
			sx={{
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: colors.main.primary300,
				width: '100vw',
				height: '100vh',
			}}>
			<SentimentVeryDissatisfiedIcon
				sx={{ width: '200px', height: '200px', color: colors.text.white }}
			/>
			<Box
				sx={{
					fontSize: '30px',
					fontWeight: '600',
					color: colors.text.white,
				}}>
				{message || '내부에서 문제가 발생했어요'}
			</Box>
		</Stack>
	);
};

export default ErrorPage;
