import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import WidgetContainer from 'components/container/WidgetConatiner';

const DetailContainer = ({ title, children, ...props }) => {
	return (
		<Stack spacing={1} direction={'column'} width={'100%'} height={'100%'}>
			<Box
				sx={{
					backgroundColor: colors.main.primary300,
					borderRadius: '10px',
					padding: '10px',
				}}>
				<Typography
					fontSize={18}
					fontWeight={600}
					color={'white'}
					textAlign={'center'}
					noWrap>
					{title}
				</Typography>
			</Box>
			<WidgetContainer
				sx={{
					borderRadius: '20px',
					height: '300px',
					padding: '20px',
				}}>
				{children}
			</WidgetContainer>
		</Stack>
	);
};

export default DetailContainer;
