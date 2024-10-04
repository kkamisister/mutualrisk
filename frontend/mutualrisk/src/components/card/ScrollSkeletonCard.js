import React from 'react';
import { Stack, Box, Avatar, Skeleton } from '@mui/material';
import { colors } from 'constants/colors';

const ScrollSkeletonCard = ({
	name,
	imagePath,
	icon,
	capital,
	clicked,
	onClick,
	sx,
}) => {
	return (
		<Skeleton
			onClick={onClick}
			sx={{
				width: '100px',
				height: '140px',
				borderRadius: '20px',
				marginRight: '5px',
				userSelect: 'none',
				border: `solid 1px ${colors.point.stroke}`,
			}}></Skeleton>
	);
};

export default ScrollSkeletonCard;
