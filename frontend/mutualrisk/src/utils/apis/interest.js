import axiosInstance from './axiosInstance';

// 관심종목 관련 API
// React-Query 단에서 Mutate가 요구되는 API들(POST, DELETE)은 Promise를 반환하도록
// 그 외, fetch만 필요한 API들(GET)은 실제 API 응답의 data 맴버 내 실제 데이터를 반환

/**
 * 유저 관심종목 조회
 * @returns {Object} - API 문서 참조
 */
export const fetchBookmarks = async () => {
	const response = await axiosInstance.get('/asset/interest');
	return response.data.data;
};

/**
 * 유저 관심종목 추가
 * @param {Number} assetId - assetId
 * @returns {Promise} - API 문서 참조
 */
export const addBookmark = async assetId => {
	return axiosInstance.post('/asset/interest', { assetId });
};

/**
 * 유저 관심종목 삭제
 * @param {Number} assetId - assetId
 * @returns {Promise} - API 문서 참조
 */
export const removeBookmark = async assetId => {
	return axiosInstance.delete(`/asset/interest?assetId=${assetId}`);
};
