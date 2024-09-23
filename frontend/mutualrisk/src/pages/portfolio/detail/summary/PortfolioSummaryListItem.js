import React from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from 'constants/colors';

const PortfolioSummaryBox = ({ title, children }) => {
	return (
		<Box
			sx={{
				backgroundColor: '#FFFFFF', // 흰색 배경
				borderRadius: '20px', // 둥근 모서리
				padding: '20px', // 내부 여백
				minWidth: '130px',
				minHeight: '6px',
				maxWidth: '160px',

				boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // 약간의 그림자 효과
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

export default PortfolioSummaryBox;
