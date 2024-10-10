import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { colors } from 'constants/colors';

const StockBookmarkListEmpty = () => {
	return (
		<Stack
			sx={{
				alignItems: 'center',
				justifyContent: 'center',
				height: '500px',
			}}>
			<Stack
				sx={{
					alignItems: 'center',
					justifyContent: 'center',
				}}
				spacing={2}>
				<StarBorderIcon
					sx={{
						color: colors.text.sub2,
						fontSize: '60px',
					}}
				/>
				<Typography color={colors.text.sub1}>
					{'북마크한 종목이 없어요'}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default StockBookmarkListEmpty;
