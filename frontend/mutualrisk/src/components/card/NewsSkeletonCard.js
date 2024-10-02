import React from 'react';
import { Skeleton } from '@mui/material';
import { colors } from 'constants/colors';

const NewsSkeletonCard = () => {
	return (
		<Skeleton
			sx={{
				bgcolor: colors.background.box,
				borderRadius: '10px',
			}}
			variant="rounded"
			width={'100%'}
			height={91.8}
		/>
	);
};

export default NewsSkeletonCard;
