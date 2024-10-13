import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import StockSearchBar from './StockSearchBar';
import { logoutUser } from 'utils/apis/user';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import logoImage from 'assets/images/logo.png';

const HeaderLayout = ({ sx }) => {
	const userName = localStorage.getItem('name');
	const navigate = useNavigate();
	const handleLogout = () => {
		logoutUser();
		localStorage.clear();
		navigate('/');
		enqueueSnackbar('정상적으로 로그아웃되었어요!', { variant: 'success' });
	};
	return (
		<Stack
			direction="row"
			sx={{
				zIndex: 3,
				minHeight: '60px',
				justifyContent: 'center',
				alignItems: 'center',
				...sx,
			}}>
			<Stack
				spacing={1}
				direction="row"
				sx={{
					position: 'absolute',
					left: '20px',
					justifyContent: 'center',
					alignItems: 'center',
					color: colors.text.main,
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
			</Stack>

			<StockSearchBar />
			<Stack
				spacing={0.3}
				sx={{
					position: 'absolute',
					right: '20px',
					justifyContent: 'center',
					alignItems: 'flex-end',
					color: colors.text.main,
				}}>
				<Stack direction="row">
					<Box sx={{ fontWeight: '600' }}>{userName}</Box>님 환영합니다!
				</Stack>
				<Box
					sx={{
						cursor: 'pointer',
						textDecoration: 'underline',
						'&:hover': {
							color: colors.text.sub2,
						},
					}}
					onClick={handleLogout}>
					로그아웃
				</Box>
			</Stack>
		</Stack>
	);
};

export default HeaderLayout;
