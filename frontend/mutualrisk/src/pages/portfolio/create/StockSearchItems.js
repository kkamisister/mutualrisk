import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from 'constants/colors';

const StockSearchItems = ({ name, imagePath, imageName }) => {
	const [clicked, setClicked] = useState(false);

	const handleClick = () => {
		setClicked(prev => !prev); // 이전 상태를 기반으로 상태를 업데이트
	};

	return (
		<Box
			onClick={handleClick}
			sx={{
				textAlign: 'center',
				borderRadius: '8px',
				p: 1,
				bgcolor: clicked ? colors.sub.sub2 : 'transparent', // clicked 상태에 따라 배경색 변경
				'&:hover': {
					bgcolor: colors.sub.sub2, // hover 시 배경색 변경
				},
			}}>
			<Box
				component="img"
				src={`${imagePath}`}
				alt={name}
				sx={{
					width: 100,
					height: 100,
					objectFit: 'cover',
					borderRadius: '100%',
				}}
			/>
			<Typography>{name}</Typography>
		</Box>
	);
};

export default StockSearchItems;
