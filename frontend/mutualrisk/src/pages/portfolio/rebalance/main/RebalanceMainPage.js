import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TitleDivider from 'components/title/TitleDivider';
import PortfolioPieChart from 'pages/portfolio/rebalance/main/piechart/PortfolioPieChart';
import PortfolioAssetList from 'pages/portfolio/rebalance/main/piechart/PortfolioAssetList';
import WidgetContainer from 'components/container/WidgetConatiner';
import CustomButton from 'components/button/BasicButton';
import Title from 'components/title/Title';
import PortfolioSummary from 'pages/portfolio/rebalance/main/summary/PortfolioSummary';
import {
	fetchPortfolioList,
	fetchPortfolioByPorfolioId,
} from 'utils/apis/analyze';
import { colors } from 'constants/colors';

const RebalanceMainPage = () => {
	const navigate = useNavigate();
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const queryClient = useQueryClient();
	let latestPortfolio = queryClient.getQueryData('latestPortfolio');
	const latestPortfolioId = latestPortfolio?.portfolioId;
	const version = latestPortfolio?.version;

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
				});
				latestPortfolio = latest;
			}
		},
	});

	const finalPortfolioId =
		latestPortfolio?.portfolioId || portfolioListData?.portfolioList?.[0]?.id;
	const finalVersion =
		latestPortfolio?.version ||
		portfolioListData?.portfolioList?.[0]?.version;

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
	const assets = portfolio?.assets || [];

	useEffect(() => {
		console.log('Portfolio version:', finalVersion);
	}, [finalVersion]);

	if (isLoading || isListLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		// return <div>Error loading portfolio data.</div>;
		return <div></div>;
	}

	return (
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
						최근 리밸런싱 : 2024/08/30
					</Typography>
				</Box>
				<Stack
					spacing={1}
					direction="row"
					sx={{
						width: '100%',
						height: '100%',
						maxHeight: '100%',
						display: 'flex',
						justifyContent: 'space-evenly',
						alignItems: 'center',
						flexWrap: 'nowrap',
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
					<span style={{ fontWeight: 'bold' }}>위험률 대비 기대수익</span>
					을 최적화 할까요?
				</Typography>
				<CustomButton
					sx={{
						width: '200px',
						height: '45px',
						backgroundColor: colors.main.primary400,
						border: 'none',
						color: '#FFFFFF',
						padding: '10px 20px',
						fontSize: '16px',
						fontWeight: 'bold',
						borderRadius: '5px',
						textAlign: 'left',
						'&:hover': { backgroundColor: colors.main.primary200 },
					}}
					onClick={() => navigate('/rebalance/result')}
					text="포트폴리오 리밸런싱"
				/>
			</Stack>
		</Stack>
	);
};

export default RebalanceMainPage;
