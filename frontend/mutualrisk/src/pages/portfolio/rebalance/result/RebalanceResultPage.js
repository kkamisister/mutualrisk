import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import TitleDivider from 'components/title/TitleDivider';
import RebalanceDetail from 'pages/portfolio/rebalance/result/detail/RebalanceDetail';
import StockChangeList from 'pages/portfolio/rebalance/result/stockchange/StockChangeList';
import BackTestChart from 'pages/portfolio/rebalance/result/backtest/BackTestChart';
import CustomButton from 'components/button/BasicButton';
import ConfirmModal from 'pages/portfolio/rebalance/result/modal/ConfirmModal';

const RebalanceResultPage = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const stockData = [
		{
			name: '엔비디아',
			ticker: 'NVDA(NASDAQ)',
			imagePath: 'https://link-to-image/nvda.png',
			currentPrice: '58,000',
			currentShares: '14',
			rebalancedPrice: '56,500',
			rebalancedShares: '19',
			change: 5,
		},
		// 추가 데이터
	];

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleSavePortfolioName = name => {
		console.log('저장된 포트폴리오 이름:', name);
		// 저장 로직 구현
		navigate('/rebalance/result');
	};

	return (
		<Stack spacing={2} sx={{ backgroundColor: colors.background.pcrimary }}>
			<Stack spacing={1}>
				<TitleDivider text="포트폴리오 리밸런싱" />
				<RebalanceDetail />
			</Stack>
			<Stack spacing={1}>
				<StockChangeList stocks={stockData} />
			</Stack>
			<Stack spacing={1}>
				<BackTestChart />
			</Stack>
			<Stack
				direction={'row'}
				sx={{
					height: '50px',
					backgroundColor: colors.background.box,
					padding: '20px 60px',
					borderRadius: '20px',
					border: `solid 1px ${colors.point.stroke}`,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Typography
					sx={{
						fontSize: '18px',
						fontWeight: 'bold',
						color: colors.text.sub1,
					}}>
					리밸런싱을 적용할까요?
				</Typography>
				<CustomButton
					sx={{
						width: '150px',
						height: '45px',
						backgroundColor: colors.main.primary400,
						border: 'none',
						color: '#FFFFFF',
						padding: '10px 20px',
						fontSize: '16px',
						fontWeight: 'bold',
						borderRadius: '5px',
						textAlign: 'left', // 버튼 텍스트 좌측 정렬
						'&:hover': {
							backgroundColor: colors.main.primary200,
						},
					}}
					onClick={handleModalOpen}
					text={'리밸런싱 적용'}></CustomButton>
			</Stack>
			<ConfirmModal
				open={isModalOpen}
				handleClose={handleModalClose}
				handleSave={handleSavePortfolioName}
			/>
		</Stack>
	);
};

export default RebalanceResultPage;
