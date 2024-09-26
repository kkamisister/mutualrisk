import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import CustomButton from 'components/button/BasicButton';
import Title from 'components/title/Title';
import { useNavigate } from 'react-router-dom';
import CurrentPortfolio from 'pages/portfolio/rebalance/main/CurrentPortfolio';

const RebalanceMainPage = () => {
	const navigate = useNavigate();

	return (
		<Stack
			direction={'column'}
			spacing={3}
			sx={{
				minWidth: '1000px',
				display: 'flex',
				alignContent: 'space-evenly',
			}}>
			<Stack
				direction={'column'}
				spacing={2}
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
				<CurrentPortfolio />
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
					onClick={() => navigate('/rebalance/result')}>
					포트폴리오 리밸런싱
				</CustomButton>
			</Stack>
		</Stack>
	);
};

export default RebalanceMainPage;
