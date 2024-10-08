import React from 'react';
import { Box, Stack, Button, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import loginButton from 'assets/images/kakao_login_large_wide.png';
import logoImage from 'assets/images/logo.png';

const LoginPage = () => {
	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
			}}>
			<Box
				sx={{
					position: 'fixed',
					aspectRatio: '1 / 1',
					top: '-224vh',
					height: '300vh',
					background:
						'radial-gradient(closest-side, #89d8d8 0%, rgba(49,130,246,0.15) 70%, rgba(255,255,255,0) 100%)',
					pointerEvents: 'none',
					zIndex: '-1',
				}}
			/>
			<Stack
				direction="column"
				sx={{
					width: '400px',
					height: '300px',
					borderRadius: '20px',
					backgroundColor: colors.background.white, // 박스 배경색 설정
					display: 'flex',
					alignSelf: 'center',
					textAlign: 'center',
					padding: '20px',
					justifyContent: 'space-evenly',
					alignItems: 'center',
				}}>
				<Box
					sx={{
						width: '100px',
						height: '100px',
						borderRadius: '25%',
						overflow: 'hidden',
					}}>
					<img
						style={{ width: '100%', height: '100%' }}
						src={logoImage}
						alt="로고 이미지"
					/>
				</Box>
				<Typography sx={{ fontSize: '24px', fontWeight: '600' }}>
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
							width: '300px',
							height: 'auto',
						}}
					/>
				</button>
			</Stack>
		</Box>
	);
};

export default LoginPage;
