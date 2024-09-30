import axios from 'axios';
sessionStorage.setItem('accessToken', 'dummyAccessToken');
const instance = axios.create({
	baseURL: 'https://j11a607.p.ssafy.io/api/v1',
	timeout: 1000,
	headers: {
		Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
	},
});

// AccessToken 만료시 재요청하는 Axios interceptor
instance.interceptors.response.use(
	response => {
		// 정상적인 응답은 그대로 반환
		return response;
	},
	async error => {
		const originalRequest = error.config;

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
				return instance(originalRequest);
			} catch (refreshError) {
				// 토큰 갱신 실패 시, 사용자 로그아웃 처리나 다른 동작 수행
				console.error('Token refresh failed:', refreshError);
				return Promise.reject(refreshError);
			}
		}

		// 그 외의 에러는 그대로 처리
		return Promise.reject(error);
	}
);

// StockBookmark 관련 API
/**
 * 북마크 결과 반환
 * @returns {Object} - API 문서 참조
 */
export const fetchBookmarks = async () => {
	const response = await instance.get('/asset/interest');
	console.log(response.data.data);
	return response.data.data;
};

/**
 * 북마크 추가
 * @param {Number} assetId - assetId
 * @returns {Promise} - API 문서 참조
 */
export const addBookmark = async assetId => {
	// const { data } = await instance.post('/asset/interest', assetId);
	return instance.post('/asset/interest', { assetId });
};

/**
 * 북마크 삭제
 * @param {Number} assetId - assetId
 * @returns {Promise} - API 문서 참조
 */
export const removeBookmark = async assetId => {
	return instance.delete(`/asset/interest?assetId=${assetId}`);
};

/**
 * 자산 검색
 * @param {String} keyword - keyword
 * @returns {Array} - assets 배열 API 문서 참조
 */
export const fetchAssetsByKeyword = async keyword => {
	if (!keyword) return { data: { assets: [] } }; // 빈 키워드일 경우 빈 결과 반환

	const response = await instance.get(`/asset/keyword?keyword=${keyword}`);
	console.log(response.data.data.assets);
	return response.data.data.assets || [];
};
