import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchLoginInfoByCode } from 'utils/apis/user';
import { enqueueSnackbar } from 'notistack';
import { Stack, Typography, CircularProgress } from '@mui/material';

const LoginCallbackPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleOAuthKakao = async code => {
		try {
			// 카카오로부터 받아온 code를 서버에 전달하여 카카오로 로그인
			const data = await fetchLoginInfoByCode(code);
			// 기본 페이지로 리다이렉션
			navigate('/portfolio/detail');
			enqueueSnackbar(`${data.userName}님 어서오세요!`, {
				variant: 'success',
			});
		} catch (error) {
			alert('로그인 과정에서 문제가 발생했습니다 x_x');
			console.log(error);
			navigate('/');
		}
	};

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const code = searchParams.get('code'); // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
		if (code) {
			// alert('CODE = ' + code);
			handleOAuthKakao(code);
		}
	}, [location]);

	return (
		<Stack
			sx={{
				width: '100vw',
				height: '100vh',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Stack
				direcion="row"
				spacing={1}
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<CircularProgress />
				<Typography>로그인하고 있어요...</Typography>
			</Stack>
		</Stack>
	);
};

export default LoginCallbackPage;
