import React from 'react';
import { Box, Stack, Avatar } from '@mui/material';
import { colors } from 'constants/colors';
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
const StockBookmarkListItem = () => {
	return (
		<Stack
			direction="row"
			spacing={2}
			sx={{
				backgroundColor: colors.background.box,
				padding: '10px',
				borderRadius: '10px',
				justifyContent: 'space-between',
				alignItems: 'center',
				width: '100%',
			}}>
			<Stack
				direction="row"
				spacing={0.3}
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
					fontSize: '14px',
				}}>
				<Avatar alt="종목 이미지" src={stockInfoSample.imageURL} />
				&nbsp;
				<Box sx={{ fontWeight: 'bold' }}>{stockInfoSample.title}</Box>
				<Box
					sx={{
						color: colors.text.sub2,
					}}>{`${stockInfoSample.symbol}(${stockInfoSample.market})`}</Box>
			</Stack>
			<Stack
				direction="column"
				spacing={0.5}
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Box sx={{ fontSize: '14px', color: colors.text.main }}>
					{stockInfoSample.price}
					&nbsp;USD
				</Box>
				<Box
					sx={{
						color: colors.point.red,
						fontSize: '12px',
					}}>
					{`+${stockInfoSample.fluctuatePrice}(+${stockInfoSample.fluctuateRate}%)`}
				</Box>
			</Stack>
		</Stack>
	);
};

export default StockBookmarkListItem;
