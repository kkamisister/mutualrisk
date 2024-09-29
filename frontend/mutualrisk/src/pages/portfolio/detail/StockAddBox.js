import React from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import CustomButton from 'components/button/BasicButton';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';

const stockInfoSample = {
	title: '엔비디아',
	market: 'NASDAQ',
	symbol: 'NVDA',
	holding: 1000000,
	imageURL:
		'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-NAS00208X-E0.png',
	returnRate: '2',
	stabilityRate: '0.2',
};

// 받침 유무 판별
const hasJongseong = word => {
	const lastChar = word[word.length - 1];
	const charCode = lastChar.charCodeAt(0);

	if (charCode >= 0xac00 && charCode <= 0xd7a3) {
		// 한글 여부 판별 (가~힣)
		const jongseong = (charCode - 0xac00) % 28; // 28개의 종성 중 0번째는 종성이 없는 경우
		return jongseong !== 0; // 받침이 있으면 true, 없으면 false
	}
	return false;
};

// 을 or 를 판별
const getParticle = word => (hasJongseong(word) ? '을' : '를');

const StockAddBox = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'start',
				alignItems: 'center',
				position: 'relative',
				padding: '14px 20px',
				backgroundColor: colors.background.box,
				borderRadius: '20px',
				minWidth: `900px`,
				width: `100% - 40px`,
				gap: '10px',
			}}>
			<Avatar
				style={{
					width: '48px',
					height: '48px',
				}}
				alt="종목 이미지"
				src={stockInfoSample.imageURL}
			/>
			<Typography
				sx={{
					fontSize: '14px',
					color: colors.text.sub2,
					// flexGrow: 1,
					minWidth: '330px',
				}}>
				<span
					style={{
						fontWeight: 'bold',
						fontSize: '16px',
					}}>
					{stockInfoSample.title}({stockInfoSample.symbol})
				</span>
				{getParticle(stockInfoSample.title)} 포트폴리오에 추가하면 예상
				수익룰이{' '}
				<span
					style={{
						fontWeight: 'bold',
					}}>
					{stockInfoSample.returnRate}%
				</span>
				, 안정성이{' '}
				<span
					style={{
						fontWeight: 'bold',
					}}>
					{stockInfoSample.stabilityRate}%
				</span>{' '}
				증가해요
			</Typography>
			<CustomButton
				// variant="contained"
				sx={{
					marginLeft: '20px',
					minWidth: '140px',
					height: '40px',
					backgroundColor: colors.main.primary300,
					border: 'none',
					borderRadius: '10px',
					color: '#FFFFFF',
					padding: '10px 20px',
					fontSize: '14px',
					'&:hover': {
						backgroundColor: colors.main.primary200,
					},
				}}
				text={'종목 추가하기'}></CustomButton>
			<ChangeCircleOutlinedIcon
				onClick={() => console.log('icon Clicked')}
				sx={{
					position: 'absolute',
					right: '20px',
					color: colors.text.sub2,
					cursor: 'pointer',
					marginLeft: '10px',
				}}
			/>
		</Box>
	);
};

export default StockAddBox;
