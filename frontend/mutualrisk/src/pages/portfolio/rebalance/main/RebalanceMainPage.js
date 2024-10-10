import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Stack, Box, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TitleDivider from 'components/title/TitleDivider';
import PortfolioPieChart from 'pages/portfolio/rebalance/main/piechart/PortfolioPieChart';
import PortfolioAssetList from 'pages/portfolio/rebalance/main/piechart/PortfolioAssetList';
import WidgetContainer from 'components/container/WidgetConatiner';
import CustomButton from 'components/button/BasicButton';
import Title from 'components/title/Title';
import PortfolioSummary from 'pages/portfolio/rebalance/main/summary/PortfolioSummary';
import ConfirmModal from 'pages/portfolio/rebalance/result/modal/ConfirmModal';
import LoadingDialog from 'components/dialog/LoadingDialog'; // LoadingDialog import
import {
	fetchPortfolioList,
	fetchPortfolioByPorfolioId,
} from 'utils/apis/analyze';
import {
	createRebalancePortfolio,
	receiveRecommendAsset,
	finalBackTest,
} from 'utils/apis/rebalance';
import { colors } from 'constants/colors';

const RebalanceMainPage = () => {
	const navigate = useNavigate();
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inputContent, setInputContent] = useState('');
	const [displayValue, setDisplayValue] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false); // State for loading dialog
	const queryClient = useQueryClient();
	let latestPortfolio = queryClient.getQueryData('latestPortfolio');

	const formatDate = dateString =>
		new Date(dateString)
			.toLocaleDateString('ko-KR', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			})
			.replace(/\./g, '/')
			.replace(/\/$/, '');

	const formatCurrency = amount =>
		`${amount.toLocaleString('ko-KR', {
			minimumFractionDigits: 1,
			maximumFractionDigits: 1,
		})} 원`;

	const { data: portfolioListData, isLoading: isListLoading } = useQuery({
		queryKey: ['portfolioList'],
		queryFn: fetchPortfolioList,
		enabled: !latestPortfolio,
		onSuccess: data => {
			if (!latestPortfolio) {
				const latest = data.portfolioList?.[0];
				queryClient.setQueryData('latestPortfolio', {
					portfolioId: latest.id,
					version: latest.version,
					createdAt: latest.createdAt,
				});
				latestPortfolio = latest;
			}
		},
	});

	const { mutateAsync: rebalancePortfolio, isLoading: isRebalancing } =
		useMutation({
			mutationFn: extraCash => createRebalancePortfolio({ extraCash }), // 첫 번째 API 호출
		});

	const { mutateAsync: recommendAsset } = useMutation({
		mutationFn: recommendData => receiveRecommendAsset(recommendData), // 두 번째 API 호출
		onError: error => {
			console.error('추천 자산 요청 실패:', error);
		},
	});

	const handleModalOpen = () => setIsModalOpen(true);
	const handleModalClose = () => {
		setIsModalOpen(false);
		setInputContent('');
		setDisplayValue('');
		setError(false);
	};

	const handleInputChange = e => {
		const value = e.target.value.replace(/,/g, '');
		if (/^-?\d*$/.test(value)) {
			setDisplayValue(e.target.value);
			setInputContent(value === '' ? '' : Number(value).toLocaleString());
			setError(false);
		} else setError(true);
	};

	const handleAmountClick = amount => {
		const currentValue = parseInt(inputContent.replace(/,/g, ''), 10) || 0;
		const newValue = currentValue + amount;
		setInputContent(newValue.toLocaleString());
		setDisplayValue(newValue.toLocaleString());
	};

	// '리밸런싱 진행' 버튼 클릭 시 호출되는 함수
	const handleRebalance = async () => {
		try {
			setLoading(true); // Show loading dialog

			const extraCashAmount = displayValue
				? parseInt(displayValue.replace(/,/g, ''), 10)
				: 0;

			// 첫 번째 API 호출
			const rebalanceData = await rebalancePortfolio(extraCashAmount);
			console.log('리밸런싱 성공:', rebalanceData);

			// 응답 데이터에서 original이 있는지 확인
			const originalData = rebalanceData?.data?.data?.original;
			console.log('originalData:', originalData);
			if (!originalData) {
				throw new Error('리밸런싱 데이터에 original 정보가 없습니다.');
			}

			const {
				totalCash,
				lowerBounds,
				upperBounds,
				exactProportion,
				assets: newPortfolioAssetInfoList,
			} = originalData;

			const requestData = {
				totalCash,
				lowerBounds,
				upperBounds,
				exactProportion,
				newPortfolioAssetInfoList,
			};

			console.log('추천 자산 요청에 전달되는 body 데이터:', requestData);

			// 두 번째 API 호출
			const recommendResponse = await recommendAsset(requestData);
			console.log('추천 자산 요청 성공:', recommendResponse);

			// 세 번째 API 호출
			const backTestResponse = await finalBackTest(
				newPortfolioAssetInfoList,
				'day',
				'profit'
			);

			console.log('백테스팅 요청 성공:', backTestResponse);

			// 직렬화할 수 없는 데이터를 제외하고 navigate로 전달
			navigate('/rebalance/result', {
				state: {
					rebalanceResponseData: {
						status: rebalanceData.status,
						data: rebalanceData.data?.data, // 필요한 부분만 전달
					},
					recommendResponseData: {
						status: recommendResponse.status,
						data: recommendResponse.data?.data, // 필요한 부분만 전달
					},
					backTestResponseData: {
						status: backTestResponse.status,
						data: backTestResponse, // 백테스팅 결과 전달
					},
				},
			});
		} catch (error) {
			console.error('리밸런싱 또는 추천 자산 요청 실패:', error);
		} finally {
			setLoading(false); // Hide loading dialog after completion
		}
	};

	const finalPortfolioId =
		latestPortfolio?.portfolioId || portfolioListData?.portfolioList?.[0]?.id;
	const finalVersion =
		latestPortfolio?.version ||
		portfolioListData?.portfolioList?.[0]?.version;
	const finalCreatedAt =
		latestPortfolio?.createdAt ||
		portfolioListData?.portfolioList?.[0]?.createdAt;

	const {
		data: portfolioData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['portfolio', finalPortfolioId],
		queryFn: () => fetchPortfolioByPorfolioId(finalPortfolioId),
		enabled: !!finalPortfolioId,
		staleTime: 300000,
		refetchOnWindowFocus: false,
	});

	const portfolio = portfolioData?.portfolio;
	const valuation = portfolio?.performance.valuation;
	const assets = portfolio?.assets || [];

	useEffect(
		() => console.log('Portfolio version:', finalVersion),
		[finalVersion]
	);

	if (isLoading || isListLoading) return <div>Loading...</div>;
	if (isError) return <div></div>;

	return (
		<>
			{/* Loading Dialog */}
			<LoadingDialog open={loading}>
				<Typography variant="h6">최적 비율을 계산 중입니다...</Typography>
			</LoadingDialog>

			<Stack
				direction="column"
				spacing={2}
				sx={{
					minWidth: '1000px',
					display: 'flex',
					alignContent: 'space-evenly',
				}}>
				<TitleDivider text="리밸런싱" />
				<Stack
					direction="column"
					spacing={1}
					sx={{
						minWidth: '300px',
						backgroundColor: colors.background.white,
						padding: '20px',
						borderRadius: '20px',
						border: `solid 1px ${colors.point.stroke}`,
					}}>
					<Title text="현재 포트폴리오" />
					<Box
						sx={{
							width: '170px',
							minWidth: '150px',
							height: '26px',
							backgroundColor: '#73748B',
							opacity: '60%',
							borderRadius: '5px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<Typography
							sx={{
								fontSize: '12px',
								color: '#FFFFFF',
								textAlign: 'center',
							}}>
							최근 리밸런싱:{' '}
							{finalCreatedAt ? formatDate(finalCreatedAt) : 'N/A'}
						</Typography>
					</Box>
					<Stack
						spacing={3}
						direction="row"
						sx={{
							width: '100%',
							height: '100%',
							display: 'flex',
							justifyContent: 'space-evenly',
							alignItems: 'center',
						}}>
						<WidgetContainer sx={{ flexWrap: 'nowrap' }}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									width: '100%',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}>
								<PortfolioPieChart
									assets={assets}
									onHover={setHoveredIndex}
									sx={{ flex: 1 }}
								/>
								<PortfolioAssetList
									sx={{ flex: 1 }}
									assets={assets}
									hoveredIndex={hoveredIndex}
								/>
							</Box>
						</WidgetContainer>
						{finalVersion ? (
							<PortfolioSummary version={finalVersion} />
						) : (
							<div>Loading version...</div>
						)}
					</Stack>
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
					<Typography sx={{ fontSize: '18px', color: colors.text.sub1 }}>
						지금 <span style={{ fontWeight: 'bold' }}>리밸런싱</span>하고{' '}
						<span style={{ fontWeight: 'bold' }}>
							위험률 대비 기대수익
						</span>
						을 최적화 할까요?
					</Typography>
					<CustomButton
						sx={{
							width: '200px',
							height: '45px',
							backgroundColor: colors.main.primary400,
							color: '#FFFFFF',
							fontSize: '16px',
							fontWeight: 'bold',
							borderRadius: '5px',
							'&:hover': { backgroundColor: colors.main.primary200 },
						}}
						onClick={handleModalOpen}
						text="포트폴리오 리밸런싱"
					/>
				</Stack>
				<ConfirmModal
					modalTitle="추가 자산 입력"
					modalLabel="추가할 자산을 입력해주세요"
					nextButton="리밸런싱 진행"
					open={isModalOpen}
					handleClose={handleModalClose}
					handleSave={handleRebalance}>
					<Stack spacing={2}>
						<Typography fontSize={13} color={colors.main.primary400}>
							{valuation
								? '기존 자산 : ' + formatCurrency(valuation)
								: 'N/A'}
						</Typography>
						<TextField
							label="추가할 자산을 입력해주세요 (원 단위)"
							variant="outlined"
							fullWidth
							value={displayValue}
							onChange={handleInputChange}
							error={error}
							helperText={error ? '유효한 자산 금액을 입력하세요' : ''}
						/>
						<Stack direction="row" spacing={1}>
							<Button
								variant="outlined"
								onClick={() => handleAmountClick(10000)}>
								1만 원
							</Button>
							<Button
								variant="outlined"
								onClick={() => handleAmountClick(100000)}>
								10만 원
							</Button>
							<Button
								variant="outlined"
								onClick={() => handleAmountClick(1000000)}>
								100만 원
							</Button>
							<Button
								variant="outlined"
								onClick={() => handleAmountClick(10000000)}>
								1000만 원
							</Button>
						</Stack>
					</Stack>
				</ConfirmModal>
			</Stack>
		</>
	);
};

export default RebalanceMainPage;
