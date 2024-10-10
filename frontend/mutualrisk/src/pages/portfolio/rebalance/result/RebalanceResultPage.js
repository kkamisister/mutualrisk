import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Stack, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import TitleDivider from 'components/title/TitleDivider';
import RebalanceDetail from 'pages/portfolio/rebalance/result/detail/RebalanceDetail';
import StockChangeList from 'pages/portfolio/rebalance/result/stockchange/StockChangeList';
import BackTestChart from 'pages/portfolio/rebalance/result/backtest/BackTestChart';
import CustomButton from 'components/button/BasicButton';
import ConfirmModal from 'pages/portfolio/rebalance/result/modal/ConfirmModal';

const RebalanceResultPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inputContent, setInputContent] = useState('');

	const {
		rebalanceResponseData,
		recommendResponseData,
		newPortfolioData,
		backTestResponseData,
	} = location.state || {};

	console.log('리밸런싱 결과:', rebalanceResponseData);
	console.log('추천 자산 결과:', recommendResponseData);
	console.log('포트폴리오 제작 결과:', newPortfolioData);
	console.log('백테스팅 결과 :', backTestResponseData);

	const handleInputChange = e => {
		setInputContent(e.target.value);
	};

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleSavePortfolioName = name => {
		console.log('저장된 포트폴리오 이름:', name);
		navigate('/rebalance/result');
	};

	return (
		<Stack spacing={2} sx={{ backgroundColor: colors.background.pcrimary }}>
			<Stack spacing={1}>
				<TitleDivider text="포트폴리오 리밸런싱" />
				<RebalanceDetail rebalanceData={rebalanceResponseData} />
			</Stack>
			<Stack spacing={1}>
				<StockChangeList rebalanceData={rebalanceResponseData} />
			</Stack>
			<Stack spacing={1}>
				<BackTestChart backtestingData={backTestResponseData} />
			</Stack>
			<Stack
				direction="row"
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
						color: '#FFFFFF',
						padding: '10px 20px',
						fontSize: '16px',
						fontWeight: 'bold',
						borderRadius: '5px',
						textAlign: 'left',
						'&:hover': {
							backgroundColor: colors.main.primary200,
						},
					}}
					onClick={handleModalOpen}
					text="리밸런싱 적용"
				/>
			</Stack>
			<ConfirmModal
				modalTitle="포트폴리오 이름"
				modalLabel="신규 포트폴리오 이름을 입력해주세요"
				nextButton="저장"
				open={isModalOpen}
				handleClose={handleModalClose}
				handleSave={handleSavePortfolioName}>
				<TextField
					label="신규 포트폴리오 이름을 입력해주세요"
					variant="outlined"
					fullWidth
					value={inputContent}
					onChange={handleInputChange}
				/>
			</ConfirmModal>
		</Stack>
	);
};

export default RebalanceResultPage;
