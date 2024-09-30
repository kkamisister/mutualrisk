import React from 'react';
import { Stack, Box, Avatar } from '@mui/material';
import { colors } from 'constants/colors';

const ScrollItem = ({ name, imagePath, capital, clicked, onClick, sx }) => {
	return (
		<Stack
			onClick={onClick}
			sx={{
				width: '100px',
				height: '140px',
				borderRadius: '20px',
				marginRight: '5px',
				cursor: 'pointer',
				fontWeight: 'bold',
				alignItems: 'center',
				color: clicked ? colors.text.main : colors.text.sub1,
				backgroundColor: clicked
					? colors.background.box
					: colors.background.white,
				userSelect: 'none',
				transition:
					'background-color 0.3s ease, color 0.3s ease, width 0.3s ease',
				'&:hover': {
					backgroundColor: colors.background.box,
				},
				border: `solid 1px ${colors.point.stroke}`,
				justifyContent: 'space-between',
				textAlign: 'center',
				...sx,
			}}>
			<Avatar
				sx={{
					width: '64px',
					height: '64px',
					marginTop: '10px',
				}}
				alt={name}
				src={imagePath}
			/>
			<Box sx={{ fontSize: '14px', marginBottom: capital ? '0px' : '30px' }}>
				{name}
			</Box>
			{capital && ( // 자본 정보가 있을 때만 표시
				<Box sx={{ fontSize: '12px', marginBottom: '10px' }}>
					${capital.toLocaleString('ko-KR')}
				</Box>
			)}
		</Stack>
	);
};

export default ScrollItem;
