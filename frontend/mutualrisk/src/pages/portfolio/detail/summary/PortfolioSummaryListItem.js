import React from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from 'constants/colors';

const PortfolioSummaryListItem = ({ title, children }) => {
	return (
		<Box
			sx={{
				backgroundColor: '#FFFFFF', // 흰색 배경
				borderRadius: '20px', // 둥근 모서리
				padding: '20px', // 내부 여백
				minWidth: '130px',
				minHeight: '6px',
				maxWidth: '160px',
				transition:
					'background-color 0.3s ease, color 0.3s ease, width 0.3s ease',
				'&:hover': {
					backgroundColor: colors.background.box,
				},
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			{/* 소제목 공통 레이아웃 */}
			<Typography
				sx={{
					fontSize: '14px',
					fontWeight: 'bold',
					color: colors.text.sub2, // 소제목 색상 (커스터마이징 가능)
					marginBottom: '10px',
				}}>
				{title}
			</Typography>

			{/* 커스텀 콘텐츠 */}
			{children}
		</Box>
	);
};

export default PortfolioSummaryListItem;
