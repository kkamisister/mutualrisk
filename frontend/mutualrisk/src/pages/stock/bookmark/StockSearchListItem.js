import React from 'react';
import { Box, Stack, Avatar } from '@mui/material';
import { colors } from 'constants/colors';

import StarOutlineIcon from '@mui/icons-material/StarOutline';

const stockInfoSample = {
	title: '엔비디아',
	market: 'NASDAQ',
	symbol: 'NVDA',
	price: 13.55,
	fluctuateRate: 3.2,
	fluctuatePrice: 0.66,
	imageURL:
		'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-NAS00208X-E0.png',
};

const StockSearchListItem = () => {
	return (
		<Stack
			direction="row"
			sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
			<Stack
				direction="row"
				spacing={0.5}
				sx={{ alignItems: 'center', justifyItems: 'space-between' }}>
				<Avatar alt="종목 이미지" src={stockInfoSample.imageURL} />
				&nbsp;
				<Box sx={{ fontWeight: 'bold' }}>{stockInfoSample.title}</Box>
				<Box
					sx={{
						color: colors.text.sub2,
					}}>{`${stockInfoSample.symbol}(${stockInfoSample.market})`}</Box>
			</Stack>
			<StarOutlineIcon fontSize="large" sx={{ color: colors.text.main }} />
		</Stack>
	);
};

export default StockSearchListItem;
