import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from 'utils/apis/axiosInstance';
const LoginCallbackPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleOAuthKakao = async code => {
		try {
			// 카카오로부터 받아온 code를 서버에 전달하여 카카오로 회원가입 & 로그인한다
			const response = await axios.get(
				`https://j11a607.p.ssafy.io/api/v1/oauth/kakao/callback?code=${code}`
			);
			const data = response.data; // 응답 데이터
			console.log('로그인 성공: ' + data);
			sessionStorage.setItem('accessToken', data.authToken.accessToken);
			sessionStorage.setItem('name', data.userName);
			axiosInstance.defaults.headers.common[
				'Authorization'
			] = `Bearer ${data.authToken.accessToken}`;
			navigate('/portfolio/detail');
		} catch (error) {
			alert('로그인 실패');
			console.log(error);
			navigate('/');
		}
	};

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const code = searchParams.get('code'); // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
		if (code) {
			alert('CODE = ' + code);
			handleOAuthKakao(code);
		}
	}, [location]);

	return (
		<div>
			<div>로그인 중입니다.</div>
		</div>
	);
};

export default LoginCallbackPage;
