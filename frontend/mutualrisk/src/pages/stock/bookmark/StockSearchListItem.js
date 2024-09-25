import React from 'react';
import { Box, Stack, Avatar } from '@mui/material';
import { colors } from 'constants/colors';

import StarOutlineIcon from '@mui/icons-material/StarOutline';

const StockSearchListItem = ({ data }) => {
	return (
		<Stack
			direction="row"
			sx={{
				width: '100%',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}>
			<Stack
				direction="row"
				spacing={0.5}
				sx={{
					alignItems: 'center',
					justifyItems: 'space-between',
					width: '100%',
				}}>
				<Avatar
					alt={`${data.name} 종목 이미지`}
					src={`http://j11a607.p.ssafy.io${data.imagePath}/${data.code}.png`}
				/>
				&nbsp;
				<Box sx={{ fontWeight: 'bold' }}>{data.name}</Box>
				<Box
					sx={{
						color: colors.text.sub2,
					}}>{`${data.code}(${data.market})`}</Box>
			</Stack>
			<StarOutlineIcon fontSize="large" sx={{ color: colors.text.main }} />
		</Stack>
	);
};

export default StockSearchListItem;
