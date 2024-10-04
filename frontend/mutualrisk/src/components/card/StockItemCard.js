import React from 'react';
import { Box, Stack, Avatar } from '@mui/material';
import { colors } from 'constants/colors';
import { useNavigate } from 'react-router-dom';
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
const StockItemCard = ({
	assetId,
	code,
	name,
	market,
	image,
	children,
	sx,
}) => {
	const navigate = useNavigate();
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
				'&:hover': {
					backgroundColor: colors.point.stroke,
				},
				transition: 'all 0.3s ease', // transition 적용
				cursor: 'pointer',
				...sx,
			}}
			onClick={() => {
				// assetId를 주면 navigate 활성화
				if (assetId !== undefined) navigate(`/stock/detail/${assetId}`);
			}}>
			<Stack
				direction="row"
				spacing={1}
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
					fontSize: '14px',
				}}>
				<Avatar alt="종목 이미지" src={image} />
				<Stack
					spacing={0.5}
					sx={{
						justifyContent: 'center',
						alignItems: 'flex-start',
					}}>
					<Box sx={{ fontWeight: 'bold' }}>{name}</Box>
					<Box
						sx={{
							color: colors.text.sub2,
						}}>{`${code}(${market})`}</Box>
				</Stack>
			</Stack>
			{children}
		</Stack>
	);
};

export default StockItemCard;
