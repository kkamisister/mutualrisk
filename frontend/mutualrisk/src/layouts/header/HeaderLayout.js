import React from 'react';
import { Stack, Box } from '@mui/material';
import { colors } from 'constants/colors';
import StockSearchBar from './StockSearchBar';
import { logoutUser } from 'utils/apis/user';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const HeaderLayout = ({ sx }) => {
	const userName = sessionStorage.getItem('name');
	const navigate = useNavigate();
	const handleLogout = () => {
		logoutUser();
		sessionStorage.clear();
		navigate('/');
		enqueueSnackbar('정상적으로 로그아웃되었어요!', { variant: 'success' });
	};
	return (
		<Stack
			direction="row"
			sx={{
				backgroundColor: colors.background.primary,
				zIndex: 3,
				minHeight: '60px',
				borderBottom: `1px solid ${colors.point.stroke}`,
				justifyContent: 'center',
				alignItems: 'center',
				...sx,
			}}>
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
