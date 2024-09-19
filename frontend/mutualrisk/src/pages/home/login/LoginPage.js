import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { colors } from 'constants/colors';
import loginButton from 'assets/images/kakao_login_medium_wide.png';

const LoginPage = () => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
			}}>
			<Box
				sx={{
					width: '400px',
					height: '300px',
					borderRadius: '20px',
					backgroundColor: colors.background.box, // 박스 배경색 설정
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignSelf: 'center',
					textAlign: 'center',
					padding: '20px',
				}}>
				<Typography
					sx={{
						fontSize: '14px',
						color: colors.text.sub1,
						marginBottom: '80px',
					}}>
					로그인 후 서비스 이용이 가능합니다.
				</Typography>
				<Typography
					sx={{
						fontSize: '16px',
						fontWeight: 'bold',
						color: colors.text.sub1,
						marginBottom: '20px',
					}}>
					로그인
				</Typography>
				<button
					onClick={() => {
						console.log('카카오 로그인 버튼 클릭');
					}}
					style={{
						width: '100%',
						maxwidth: '300px',
						border: 'none',
						backgroundColor: 'transparent',
						cursor: 'pointer',
						padding: '0',
					}}>
					<img
						src={loginButton}
						alt="로그인"
						style={{
							width: '250px',
							height: 'auto',
						}}></img>
				</button>
			</Box>
		</Box>
	);
};

export default LoginPage;
