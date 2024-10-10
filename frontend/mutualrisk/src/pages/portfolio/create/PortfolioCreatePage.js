import React, { useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	Stepper,
	Step,
	StepLabel,
	Backdrop,
	Stack,
	Typography,
	Grid,
	Box,
	DialogTitle,
} from '@mui/material';
import BoxTitle from 'components/title/BoxTitle';
import StockSearch from 'pages/portfolio/create/stocksearch/StockSearch';
import ConditionSetting from 'pages/portfolio/create/condition/ConditionSetting';
import SelectedList from 'pages/portfolio/create/selectedstock/SelectedList';
import AssetInputModal from 'pages/portfolio/create/AssetInputModal';
import {
	fetchPortfolioList,
	fetchPortfolioByPorfolioId,
} from 'utils/apis/analyze';
import useAssetStore from 'stores/useAssetStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { colors } from 'constants/colors';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const PortfolioCreatePage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [hasPortfolio, setHasPortfolio] = useState(false);
	const [latestPortfolioId, setLatestPortfolioId] = useState('');
	const [showContraint, setShowConstraint] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const {
		assets,
		updateAsset,
		updateTotalCash,
		setIsRecommended,
		addAsset,
		isRecommended,
	} = useAssetStore(state => ({
		assets: state.assets,
		updateAsset: state.updateAsset,
		updateTotalCash: state.updateTotalCash,
		setIsRecommended: state.setIsRecommended,
		addAsset: state.addAsset,
		isRecommended: state.isRecommended,
	}));

	const queryClient = useQueryClient();
	const recommendedAsset = queryClient.getQueryData('selectedAsset');
	useEffect(() => {
		setIsRecommended(true);
		// console.log('아 얘는 추천을받았단게');
	}, [recommendedAsset]);

	const fetchRecommended = asset => {
		if (asset) {
			// console.log('자산추천 받았다네', asset);
			addAsset(asset);
		}
	};

	const { data: portfolioList } = useQuery({
		queryKey: ['portfolioList'],
		queryFn: fetchPortfolioList,
	});

	const onItemsConfirm = () => {
		setShowConstraint(true);
	};

	useEffect(() => {
		if (portfolioList && portfolioList.hasPortfolio) {
			setHasPortfolio(portfolioList.hasPortfolio);
			updateTotalCash(portfolioList.recentValuation);
			setLatestPortfolioId(portfolioList.portfolioList[0].id);
		}
	}, [portfolioList]);

	const { data: latestPortfolio } = useQuery({
		queryKey: ['portfolioDetail', latestPortfolioId],
		queryFn: () => {
			return fetchPortfolioByPorfolioId(latestPortfolioId);
		},
		enabled: !!latestPortfolioId,
	});

	useEffect(() => {
		const fetchAndAddAsset = async () => {
			if (latestPortfolio && latestPortfolio.portfolio) {
				if (isRecommended) {
					updateAsset(latestPortfolio.portfolio.assets);
					fetchRecommended(recommendedAsset);
					// console.log('추천도완');
				} else {
					updateAsset(latestPortfolio.portfolio.assets);
					// console.log('업뎃완');
				}
			} else {
				setIsDialogOpen(true);
			}
		};

		fetchAndAddAsset();
	}, [latestPortfolio, isRecommended, recommendedAsset]);

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const closeDialog = () => {
		setIsDialogOpen(false); // Dialog를 닫기 위해 false로 설정
		setIsModalOpen(true); // AssetInputModal을 열기 위해 true로 설정
	};

	const steps = ['관심 종목 선정', '제약 조건 설정', '포트폴리오 제작'];

	const handleNext = () => {
		if (activeStep < steps.length - 1) {
			setActiveStep(prevStep => prevStep + 1);
		} else {
			closeDialog();
		}
	};

	const handleBack = () => {
		setActiveStep(prevStep => prevStep - 1);
	};

	return (
		<Stack spacing={1} sx={{ height: '100vh' }}>
			<BoxTitle title="포트폴리오 제작" />
			<Grid
				container
				spacing={2}
				sx={{ height: '90vh', overflowY: 'hidden' }}>
				<Grid item xs={4.8} sx={{ height: '100%' }}>
					<Stack spacing={2} height="100%">
						<StockSearch
							sx={{
								minHeight: '45%',
								maxHeight: '45%',
							}}
						/>
						{assets && (
							<SelectedList
								onItemsConfirm={onItemsConfirm}
								assets={assets}
								sx={{ height: '45%' }}
							/>
						)}
					</Stack>
				</Grid>

				<Grid item xs={7} sx={{ height: '100%', maxHeight: '800px' }}>
					{(showContraint || hasPortfolio) && (
						<ConditionSetting assets={assets} />
					)}
				</Grid>
			</Grid>
			{isDialogOpen && !hasPortfolio && (
				<>
					<Backdrop open={isDialogOpen} style={{ zIndex: 1300 }} />
					<Dialog
						open={isDialogOpen}
						onClose={closeDialog}
						fullWidth
						maxWidth="sm">
						<DialogTitle>포트폴리오 제작하기</DialogTitle>
						<DialogContent>
							<Stepper activeStep={activeStep} alternativeLabel>
								{steps.map((label, index) => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>
							{activeStep === 0 && (
								<Stack
									sx={{
										alignItems: 'center',
										pointerEvents: 'none',
										p: 1,
										height: '100px',
									}}>
									<ShoppingBasketIcon
										sx={{
											color: colors.text.sub2,
											fontSize: '50px',
										}}
									/>
									<Typography
										sx={{
											color: colors.text.main,
											fontWeight: 540,
											fontSize: '15px',
											mt: 2,
										}}>
										국내외 다양한 시장에서 관심 있는 종목을
										담아보세요.
									</Typography>
									<Typography
										sx={{
											color: colors.text.sub2,
											fontSize: '12px',
											pt: 1,
										}}>
										보유 시장: ETF, KOSDAQ, KOSDAQ_GLOBAL, KOSPI,
										KONEX, AMEX, NASDAQ, NYSE
									</Typography>
								</Stack>
							)}
							{activeStep === 1 && (
								<Stack
									sx={{
										alignItems: 'center',
										height: '100px',
										p: 1,
									}}>
									<Typography
										sx={{
											color: colors.text.main,
											fontWeight: 540,
											fontSize: '15px',
											textAlign: 'center',
											mt: 2,
										}}>
										각 자산 별 최솟값 · 최댓값 · 지정 비율을 지정할 수
										있습니다. <br />
										제약 조건 미설정 시 자동으로 최적 비중을
										추천합니다.
									</Typography>
									<Typography
										sx={{
											color: colors.text.sub2,
											fontSize: '12px',
											pt: 1,
										}}>
										주당 가격에 따라 설정 비율을 맞출 수 없는 경우
										근접값을 제공합니다.
									</Typography>
								</Stack>
							)}
							{activeStep === 2 && (
								<Stack
									sx={{
										alignItems: 'center',
										height: '100px',
										p: 1,
									}}>
									<Typography
										sx={{
											color: colors.text.main,
											fontWeight: 540,
											fontSize: '15px',
											textAlign: 'center',
											mt: 2,
										}}>
										포트폴리오의 기대 수익률을 확인하고, <br />
										포트폴리오의 성과를 극대화할 수 있는 종목 추천도
										받아보세요.
									</Typography>
								</Stack>
							)}
						</DialogContent>
						<DialogActions style={{ justifyContent: 'center' }}>
							<Button onClick={handleBack} disabled={activeStep === 0}>
								이전
							</Button>
							<Button onClick={handleNext} variant="contained">
								{activeStep === steps.length - 1 ? '시작하기' : '다음'}
							</Button>
						</DialogActions>
					</Dialog>
				</>
			)}
			{isModalOpen && (
				<AssetInputModal
					open={isModalOpen}
					handleClose={handleModalClose}
				/>
			)}
		</Stack>
	);
};

export default PortfolioCreatePage;
