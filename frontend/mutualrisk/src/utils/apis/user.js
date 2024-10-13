import axiosInstance from './axiosInstance';

// 로그인 관련 API
// React-Query 단에서 Mutate가 요구되는 API들(POST, DELETE)은 Promise를 반환하도록
// 그 외, fetch만 필요한 API들(GET)은 실제 API 응답의 data 맴버 내 실제 데이터를 반환

/**
 * 카카오 OAuth 코드로 AccessToken 및 사용자명 반환
 * @param {String} code - code
 * @returns {Object} -API 문서 참조
 */
export const fetchLoginInfoByCode = async code => {
	const response = await axiosInstance.get(
		`/oauth/kakao/callback?code=${code}`
	);
	const data = response.data;
	localStorage.setItem('accessToken', data.authToken.accessToken);
	localStorage.setItem('name', data.userName);

	// 받은 API Key로 axios instance에 Authorization 설정
	axiosInstance.defaults.headers.common[
		'Authorization'
	] = `Bearer ${data.authToken.accessToken}`;
	console.log(axiosInstance.defaults.headers.common['Authorization']);

	return response.data;
};

/**
 * 로그아웃
 * @returns {Boolean} -API 문서 참조
 */
export const logoutUser = async () => {
	const response = await axiosInstance.get(`/oauth/kakao/logout`);
	return response.data.status === 200;
};
