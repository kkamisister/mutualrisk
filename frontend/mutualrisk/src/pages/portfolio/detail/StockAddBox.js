import React, { useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import CustomButton from 'components/button/BasicButton';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const StockAddBox = ({ recommendAssets }) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [currentIndex, setCurrentIndex] = useState(0);

	const currentAsset = recommendAssets[currentIndex];

	const handleNextAsset = () => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % recommendAssets.length);
	};

	const handleAddAsset = () => {
		queryClient.setQueryData('selectedAsset', currentAsset);
		navigate('/portfolio/create');
		console.log('추천받은 종목 정보: ', currentAsset);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'start',
				alignItems: 'center',
				position: 'relative',
				padding: '14px 20px',
				backgroundColor: colors.background.white,
				border: '1px solid',
				borderColor: colors.background.box,
				borderRadius: '20px',
				minWidth: `900px`,
				gap: '10px',
			}}>
			<Avatar
				style={{
					width: '48px',
					height: '48px',
				}}
				alt={currentAsset.name}
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
				<span style={{ fontWeight: 'bold' }}>
					{currentAsset.expectedReturn.toFixed(3)}%P 증가
				</span>
				{`, 변동성이 `}
				<span style={{ fontWeight: 'bold' }}>
					{currentAsset.volatilityChange >= 0 &&
						`${currentAsset.volatilityChange.toFixed(4)}%P 증가`}
					{currentAsset.volatilityChange < 0 &&
						`${(-1 * currentAsset.volatilityChange).toFixed(4)}%P 감소`}
				</span>
				{` 해요.`}
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
				onClick={handleAddAsset}
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
