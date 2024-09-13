import { colors } from 'constants/colors';
import React from 'react';
import { Stack, Avatar, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
const stockInfoSample = {
	title: '엔비디아',
	market: 'NASDAQ',
	symbol: 'NVDA',
	holding: 1000000,
	imageURL:
		'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-NAS00208X-E0.png',
};
const FundStockListItem = () => {
	return (
		<Stack
			direction="row"
			sx={{
				backgroundColor: colors.background.box,
				padding: '10px',
				borderRadius: '10px',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}>
			<Stack
				direction="row"
				spacing={0.5}
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
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
				direction="row"
				spacing={1}
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Box>
					{stockInfoSample.holding.toLocaleString('ko-KR')}
					&nbsp;USD
				</Box>
				<Box
					sx={{
						fontWeight: 'bold',
						fontSize: '20px',
					}}>
					1위
				</Box>
				<StarIcon sx={{ color: colors.point.yellow }} />
			</Stack>
		</Stack>
	);
};

export default FundStockListItem;
