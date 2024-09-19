import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CustomButton from 'components/button/BasicButton';
import Typography from '@mui/material/Typography';
import { colors } from 'constants/colors';
import IconImage from './IconImage';
import coinImage from 'assets/images/coin.png'; // 이미지 경로
import scaleImage from 'assets/images/scale.png';
import billImage from 'assets/images/bill.png';

const HomePage = () => {
	return (
		// <Box
		//   sx={{
		//     backgroundColor: colors.background.primary,
		//     display: 'flex',
		//     justifyContent: 'center',
		//     alignItems: 'center',
		//     minHeight: '100vh',
		//     padding: '40px 20px',
		//   }}
		// >
		<Stack
			direction="row"
			sx={{
				width: '100%',
				height: '100%', // 화면 높이를 100%로 설정
				justifyContent: 'space-around',
				alignItems: 'center',
				padding: { xs: '20px', md: '40px' }, // 화면 크기에 따라 패딩 조정
			}}>
			<Stack
				spacing={2}
				sx={{
					maxWidth: '50%',
					justifyContent: 'center',
					alignItems: 'flex-start',
				}}>
				<Typography
					variant="h3"
					sx={{
						fontWeight: 'bold',
						color: colors.text.main,
						textAlign: 'left', // 좌측 정렬
						maxWidth: '100%', // 최대 너비 설정
						fontSize: { xs: '16px', sm: '20px', md: '24px', lg: '28px' }, // 반응형 폰트 크기
						lineHeight: '1.5', // 줄 간격 설정
						whiteSpace: 'nowrap',
					}}>
					빅데이터 기반 리밸런싱으로 <br /> 완벽한 리스크 관리
				</Typography>

				{/* 포트폴리오 제작 버튼 */}
				<CustomButton
					variant="contained"
					sx={{
						width: '240px',
						height: '50px',
						backgroundColor: '#6495ED',
						color: '#FFFFFF',
						padding: '10px 20px',
						fontSize: '18px',
						fontWeight: 'semiBold',
						borderRadius: '5px',
						textAlign: 'left', // 버튼 텍스트 좌측 정렬
						'&:hover': {
							backgroundColor: '#4169E1',
						},
						marginBottom: '40px',
					}}
					onClick={() => console.log('포트폴리오 제작')}>
					포트폴리오 제작
				</CustomButton>
			</Stack>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '20px',
				}}>
				<IconImage src={coinImage} alt="coin" />
				<IconImage src={scaleImage} alt="scale" />
				<IconImage src={billImage} alt="bill" />
			</Box>
		</Stack>
		// </Box>
	);
};

export default HomePage;
