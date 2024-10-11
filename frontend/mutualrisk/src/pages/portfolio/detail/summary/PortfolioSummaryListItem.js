import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import WidgetContainer from 'components/container/WidgetConatiner';

const PortfolioSummaryListItem = ({ title, children, sx }) => {
	return (
		<WidgetContainer
			sx={{
				padding: '18px 20px',
				minWidth: '150px',
				maxWidth: '160px',
				transition:
					'background-color 0.3s ease, color 0.3s ease, width 0.3s ease',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				'&:hover': {
					backgroundColor: colors.background.box,
				},
				...sx,
			}}>
			<Typography
				sx={{
					fontSize: '13px',
					fontWeight: 'bold',
					color: colors.text.sub2,
				}}>
				{title}
			</Typography>

			<Box
				sx={{
					flexGrow: 1,
					height: '100%',
				}}>
				{children}
			</Box>
		</WidgetContainer>
	);
};

export default PortfolioSummaryListItem;
