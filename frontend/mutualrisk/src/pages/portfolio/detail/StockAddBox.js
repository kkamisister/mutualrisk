import React, { useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
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

const StockAddBox = ({ recommendAssets }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	// 현재 인덱스에 해당하는 추천 종목
	const currentAsset = recommendAssets[currentIndex];

	// 다음 종목으로 이동하는 함수
	const handleNextAsset = () => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % recommendAssets.length);
	};
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
				src={`https://j11a607.p.ssafy.io/stockImage/${currentAsset.code}.png`}
			/>
			<Typography
				sx={{
					fontSize: '16px',
					color: colors.text.main,
					minWidth: '330px',
				}}>
				<span
					style={{
						fontWeight: 'bold',
						fontSize: '16px',
					}}>
					{currentAsset.name}({currentAsset.code})
				</span>
				{`을(를) 포트폴리오에 추가하면 예상 수익률이 `}
				{/* <br /> 줄 바꿈 추가 */}
				{/* {`예상 수익률이 `} */}
				<span style={{ fontWeight: 'bold' }}>
					{currentAsset.expectedReturn.toFixed(2)}%
				</span>
				{`, 안정성이 `}
				<span style={{ fontWeight: 'bold' }}>
					{currentAsset.volatilityChange.toFixed(2)}%
				</span>
				{` 증가해요.`}
			</Typography>
			<CustomButton
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
				text={'종목 추가하기'}
			/>
			<ChangeCircleOutlinedIcon
				onClick={handleNextAsset}
				sx={{
					position: 'absolute',
					right: '40px',
					color: colors.text.sub1,
					cursor: 'pointer',
					fontSize: '30px',
					'&:hover': {
						color: colors.text.sub2,
					},
				}}
			/>
		</Box>
	);
};

export default StockAddBox;
