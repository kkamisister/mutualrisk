import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CustomButton from 'components/button/BasicButton';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { colors } from 'constants/colors';
import IconImage from './IconImage';
import coinImage from 'assets/images/coin.png'; // 이미지 경로
import scaleImage from 'assets/images/scale.png';
import billImage from 'assets/images/bill.png';

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<Stack
			direction="row"
			spacing={1}
			sx={{
				width: '100%',
				justifyContent: 'space-evenly',
				alignItems: 'center',
			}}>
			<Stack
				spacing={2}
				sx={{
					// maxWidth: '50%',
					Width: '50%',
					justifyContent: 'center',
					alignItems: 'flex-start',
				}}>
				<Typography
					variant="h3"
					sx={{
						fontWeight: 'bold',
						color: colors.text.sub1,
						textAlign: 'left', // 좌측 정렬
						maxWidth: '100%', // 최대 너비 설정
						fontSize: '30px',
						lineHeight: '1.5', // 줄 간격 설정
						whiteSpace: 'nowrap',
						letterSpacing: '-2px',
					}}>
					빅데이터 기반 리밸런싱으로 <br /> 완벽한 리스크 관리
				</Typography>

				{/* 포트폴리오 제작 버튼 */}
				<CustomButton
					variant="contained"
					sx={{
						width: '180px',
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
						marginBottom: '40px',
					}}
					onClick={() => navigate('/login')}>
					포트폴리오 제작
				</CustomButton>
			</Stack>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<IconImage src={coinImage} alt="coin" />
				<IconImage src={scaleImage} alt="scale" />
				<IconImage src={billImage} alt="bill" />
			</Box>
		</Stack>
	);
};

export default HomePage;
