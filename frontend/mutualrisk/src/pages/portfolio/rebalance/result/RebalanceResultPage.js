import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Stack, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import TitleDivider from 'components/title/TitleDivider';
import RebalanceDetail from 'pages/portfolio/rebalance/result/detail/RebalanceDetail';
import StockChangeList from 'pages/portfolio/rebalance/result/stockchange/StockChangeList';
import BackTestChart from 'pages/portfolio/rebalance/result/backtest/BackTestChart';
import CustomButton from 'components/button/BasicButton';
import ConfirmModal from 'pages/portfolio/rebalance/result/modal/ConfirmModal';
import { confirmPortfolio } from 'utils/apis/portfolio';
import SuccessSnackbar from 'components/snackbar/SuccessSnackbar';
import useAssetStore from 'stores/useAssetStore';
import LoadingDialog from 'components/dialog/LoadingDialog'; // Import LoadingDialog

const RebalanceResultPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inputContent, setInputContent] = useState('');
	const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility state
	const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
	const [isLoading, setIsLoading] = useState(false); // State for loading dialog

	const { setIsRecommended } = useAssetStore(state => ({
		setIsRecommended: state.setIsRecommended,
	}));
	useEffect(() => {
		setIsRecommended(false);
	}, []);

	const {
		rebalanceResponseData,
		recommendResponseData,
		backTestResponseData,
	} = location.state || {};

	const { original } = rebalanceResponseData?.data || {};
	const assets = original?.assets || [];

	const mutation = useMutation({
		mutationFn: confirmPortfolio,
		onMutate: () => {
			setIsLoading(true); // Show loading dialog on request start
		},
		onSuccess: () => {
			setSnackbarMessage('포트폴리오가 성공적으로 저장되었습니다.');
			setOpenSnackbar(true); // Open the snackbar on success
			setIsLoading(false); // Hide loading dialog on success
			navigate('/portfolio/detail');
			window.location.reload();
		},
		onError: error => {
			console.error('포트폴리오 저장 중 에러 발생:', error);
			setIsLoading(false); // Hide loading dialog on error
		},
	});

	console.log('리밸런싱 결과:', rebalanceResponseData);
	console.log('추천 자산 결과:', recommendResponseData);
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

	const handleSavePortfolioName = () => {
		const assetIds = assets.map(asset => asset.assetId);
		const { totalCash, lowerBounds, upperBounds, exactProportion } = original;

		mutation.mutate({
			name: inputContent, // 포트폴리오 이름
			totalCash,
			assetIds,
			lower_bounds: lowerBounds,
			upper_bounds: upperBounds,
			exact_proportion: exactProportion,
		});

		handleModalClose(); // Close the modal
	};

	return (
		<>
			{/* Loading Dialog */}
			<LoadingDialog open={isLoading}>
				<Typography variant="h6">포트폴리오를 저장 중입니다...</Typography>
			</LoadingDialog>

			<Stack
				spacing={2}
				sx={{ backgroundColor: colors.background.pcrimary }}>
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
						추천 비율을 적용할까요?
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
						text="적용하기"
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
				<SuccessSnackbar
					message={snackbarMessage}
					openSnackbar={openSnackbar}
					// handleSnackbarClose={handleSnackbarClose}
				/>
			</Stack>
		</>
	);
};

export default RebalanceResultPage;
