import React from 'react';
import TitleDivider from 'components/title/TitleDivider';
import { Stack, Box, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import CustomButton from 'components/button/BasicButton';
import Title from 'components/title/Title';
import { useNavigate } from 'react-router-dom';
import PortfolioPieChart from 'pages/portfolio/rebalance/main/piechart/PortfolioPieChart';
import PortfolioAssetList from 'pages/portfolio/rebalance/main/piechart/PortfolioAssetList';
import PortfolioSummary from 'pages/portfolio/rebalance/main/summary/PortfolioSummary';
import WidgetContainer from 'components/container/WidgetConatiner';

const RebalanceMainPage = () => {
	const navigate = useNavigate();

	return (
		<Stack
			direction={'column'}
			spacing={2}
			sx={{
				minWidth: '1000px',
				display: 'flex',
				alignContent: 'space-evenly',
			}}>
			<TitleDivider text="리밸런싱" />
			<Stack
				direction={'column'}
				spacing={1}
				sx={{
					minWidth: '300px',
					backgroundColor: colors.background.white,
					padding: '20px',
					borderRadius: '20px',
					border: `solid 1px ${colors.point.stroke}`,
				}}>
				<Title text="현재 포트폴리오"></Title>
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
						// padding: '4px 8px',
					}}>
					<Typography
						sx={{
							fontSize: '12px',
							color: '#FFFFFF',
							textAlign: 'center',
						}}>
						최근 리밸런싱 : 2024/08/30{' '}
					</Typography>
				</Box>
				<Stack
					spacing={2}
					direction="row"
					sx={{
						width: '100%',
						height: '100%',
						maxHeight: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						flexWrap: 'nowrap',
					}}>
					<WidgetContainer sx={{ flexWrap: 'nowrap' }}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row', // 가로 정렬
								width: '100%', // 너비를 100%로 설정하여 공간 활용
								justifyContent: 'space-between', // 두 컴포넌트 사이의 간격을 조절
								alignItems: 'center', // 세로 정렬 정중앙
							}}>
							<PortfolioPieChart sx={{ flex: 1 }} />
							<PortfolioAssetList sx={{ flex: 1 }} />
						</Box>
					</WidgetContainer>

					<PortfolioSummary />
				</Stack>
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
						textAlign: 'left', // 버튼 텍스트 좌측 정렬
						'&:hover': {
							backgroundColor: colors.main.primary200,
						},
					}}
					onClick={() => navigate('/rebalance/result')}
					text={'포트폴리오 리밸런싱'}></CustomButton>
			</Stack>
		</Stack>
	);
};

export default RebalanceMainPage;
