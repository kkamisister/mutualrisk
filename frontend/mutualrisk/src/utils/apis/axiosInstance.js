import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://j11a607.p.ssafy.io/api/v1',
	// timeout: 1000,
	timeout: 20000,
	headers: {
		Authorization: `Bearer ${
			sessionStorage.getItem('accessToken') || 'dummyAccessToken'
		}`,
	},
	withCredentials: true,
});

// AccessToken 만료시 재요청하는 Axios interceptor
axiosInstance.interceptors.response.use(
	response => {
		// 정상적인 응답은 그대로 반환
		return response;
	},
	async error => {
		const originalRequest = error.config;
		if (error.response) {
			// 401 에러 && 최초 시도인 경우 && 토큰이 있는 경우
			if (
				error.response.status === 401 &&
				!originalRequest._retry &&
				originalRequest.headers['reissue-token']
			) {
				originalRequest._retry = true; // 재시도 확인

				try {
					// 새로운 토큰 저장
					const newAccessToken = originalRequest.headers['reissue-token'];
					sessionStorage.setItem('accessToken', newAccessToken);

					// 갱신된 토큰을 사용해 원래의 요청을 다시 보냄
					originalRequest.headers[
						'Authorization'
					] = `Bearer ${newAccessToken}`;

					// 다시 시도한 요청을 반환
					return axiosInstance(originalRequest);
				} catch (refreshError) {
					// 토큰 갱신 실패 시, 사용자 로그아웃 처리나 다른 동작 수행
					console.error('Token refresh failed:', refreshError);
					return Promise.reject(refreshError);
				}
			}
		}

		// 그 외의 에러는 그대로 처리
		return Promise.reject(error);
	}
);

export default axiosInstance;
