import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import WidgetContainer from 'components/container/WidgetConatiner';

const PortfolioSummaryListItem = ({ title, children }) => {
	return (
		<WidgetContainer
			sx={{
				padding: '18px 20px',
				minWidth: '150px',
				maxWidth: '160px',
				transition:
					'background-color 0.3s ease, color 0.3s ease, width 0.3s ease',
				'&:hover': {
					backgroundColor: colors.background.box,
				},
			}}>
			{/* 소제목 공통 레이아웃 */}
			<Typography
				sx={{
					fontSize: '13px',
					fontWeight: 'bold',
					color: colors.text.sub2,
					marginBottom: '8px',
				}}>
				{title}
			</Typography>

			{/* 커스텀 콘텐츠 */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					justifyContent: 'space-between',
					height: '100%',
				}}>
				{children}
			</Box>
		</WidgetContainer>
	);
};

export default PortfolioSummaryListItem;
