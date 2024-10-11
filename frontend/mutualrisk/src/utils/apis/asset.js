import axiosInstance from './axiosInstance';

// 자산 관련 API
// React-Query 단에서 Mutate가 요구되는 API들(POST, DELETE)은 Promise를 반환하도록
// 그 외, fetch만 필요한 API들(GET)은 실제 API 응답의 data 맴버 내 실제 데이터를 반환

/**
 * 키워드 기반 종목 검색 결과 조회
 * @param {String} keyword - keyword
 * @returns {Array} - assets 배열, API 문서 참조
 */
export const fetchAssetsByKeyword = async keyword => {
	if (!keyword) return { data: { assets: [] } }; // 빈 키워드일 경우 빈 결과 반환

	const response = await axiosInstance.get(
		`/asset/keyword?keyword=${keyword}`
	);
	return response.data.data.assets || [];
};

/**
 * 자산 정보 조회
 * @param {Number} assetId - assetId
 * @returns {Object} - Response 내 data 객체, API 문서 참조
 */
export const fetchAssetByAssetId = async assetId => {
	const response = await axiosInstance.get(`/asset/${assetId}`);
	return response.data.data || [];
};

/**
 * 주식 상세정보 조회
 * @param {Number} assetId - assetId
 * @returns {Object} - Response 내 data 객체, API 문서 참조
 */
export const fetchStockDetailByAssetId = async assetId => {
	const response = await axiosInstance.get(
		`/asset/detail/stock?assetId=${assetId}`
	);
	return response.data.data;
};

/**
 * ETF 상세정보 조회
 * @param {Number} assetId - assetId
 * @returns {Object} - Response 내 data 객체, API 문서 참조
 */
export const fetchEtfByAssetId = async assetId => {
	const response = await axiosInstance.get(
		`/asset/detail/etf?assetId=${assetId}`
	);
	return response.data.data;
};

/**
 * 자산의 기간 내 종가 조회
 * @typedef {Number} assetId
 * @typedef {Number} period - 조회 기간 (일 단위)
 * @typedef {Number} offset - 처음에 조회할 기간의 오프셋
 * @param {{assetId, period, offest}}
 * @returns {Object} - Response 내 data 객체, API 문서 참조
 */
export const fetchAssetHistoryByAssetId = async ({
	assetId,
	period,
	offset,
}) => {
	const response = await axiosInstance.get(
		`/asset/history/${assetId}?period=${period}&offset=${offset}`
	);
	return response.data.data;
};
