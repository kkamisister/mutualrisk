import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { colors } from 'constants/colors';
import logoImage from 'assets/images/logo.png';

const MainLayout = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const isHomePage = location.pathname === '/'; // HomePage 여부 확인

	const headerRef = useRef(null); // 헤더 요소를 참조하기 위한 ref
	const [headerHeight, setHeaderHeight] = useState(0); // 헤더 높이 저장

	// 헤더 높이를 계산하여 상태에 설정
	useEffect(() => {
		if (headerRef.current) {
			setHeaderHeight(headerRef.current.offsetHeight);
		}
	}, []);

	return (
		<Stack
			direction="row"
			sx={{
				width: '100%',
				height: '100%',
				background: 'rgba(0,0,0,0)',
			}}>
			{/* 헤더 */}

			<Stack
				direction="row"
				sx={{
					height: '60px',
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					padding: '10px 80px',
					alignItems: 'center',
					justifyContent: 'space-between',
					zIndex: 1000,
					boxSizing: 'border-box',
					background: 'rgba(255,255,255,0.3)',
					backdropFilter: 'blur(3px)',
				}}>
				{/* 로고 */}
				<Stack
					direction="row"
					sx={{
						cursor: 'pointer',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					spacing={1}
					onClick={() => {
						navigate('/');
					}}>
					<Box
						sx={{
							width: '36px',
							height: '36px',
							borderRadius: '25%',
							overflow: 'hidden',
						}}>
						<img
							style={{ width: '100%', height: '100%' }}
							src={logoImage}
							alt="로고 이미지"
						/>
					</Box>
					<Typography
						sx={{
							color: colors.text.sub1,
							fontSize: '16px',
							fontWeight: '600',
						}}>
						뮤탈리스크
					</Typography>
				</Stack>
				{/* '로그인' 버튼 : HomePage에서만 노출 */}
				{isHomePage && (
					<Button
						sx={{
							textAlign: 'center',
							cursor: 'pointer',
							padding: '7px 15px',
							borderRadius: '5px',
							fontWeight: 'bold',
							transition: 'background-color 0.3s ease, color 0.3s ease',
							whiteSpace: 'nowrap',
							color: colors.text.white,

							backgroundColor: colors.main.primary400,
							'&:hover': {
								backgroundColor: colors.main.primary500,
							},
						}}
						onClick={() => navigate('/login')}>
						로그인
					</Button>
				)}
			</Stack>

			<Box
				sx={{
					width: '100%',
					height: '100%',
					minHeight: `calc(100vh - ${headerHeight}px)`,
					paddingTop: `${headerHeight}px`,
					alignItems: 'center',
					justifyContent: 'center',
					background: 'rgba(0,0,0,0)',
					display: 'flex',
				}}>
				<Outlet />
			</Box>
		</Stack>
	);
};

export default MainLayout;
