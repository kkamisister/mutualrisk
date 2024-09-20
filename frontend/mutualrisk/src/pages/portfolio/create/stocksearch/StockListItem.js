import React, { useState } from 'react';
import { Stack, Box, Avatar } from '@mui/material';
import { colors } from 'constants/colors';

const StockListItem = ({ name, imagePath, imageName, clicked }) => {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		setIsClicked(prev => !prev);
	};

	return (
		<Stack
			onClick={handleClick}
			sx={{
				width: '100px',
				height: '140px',
				borderRadius: '20px',
				marginRight: '5px',
				cursor: 'pointer',
				fontWeight: 'bold',
				color: isClicked ? colors.text.main : colors.text.sub1,
				backgroundColor: isClicked
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
			}}>
			<Avatar
				sx={{
					width: '64px',
					height: '64px',
					marginX: '20px',
					marginTop: '10px',
				}}
				spacing={0.75}
				alt={name}
				src={imagePath}
			/>
			<Box sx={{ fontSize: '14px', marginBottom: '30px' }}>{name}</Box>
		</Stack>
	);
};

export default StockListItem;
