import axiosInstance from './axiosInstance';

// 리밸런싱 관련 API
// React-Query 단에서 Mutate가 요구되는 API들(POST, DELETE)은 Promise를 반환하도록
// 그 외, fetch만 필요한 API들(GET)은 실제 API 응답의 data 맴버 내 실제 데이터를 반환

/**
 * 리밸런싱 포트폴리오 제작
 * @typedef {Number} extraAssetId - 유저가 포트폴리오에 추가할 자산, 생략 가능
 * @typedef {Number} extraCash - 유저가 추가 매수할 금액, 생략 가능
 * @param {{extraAssetId,  extraCash}} assetId - assetId
 * @returns {Promise} - API 문서 참조
 */
export const createRebalancePortfolio = async ({extraAssetId = null, extraCash = null}) => {
	return axiosInstance.post('/rebalance', { extraAssetId, extraCash });
};

/**
 * 리밸런싱 포트폴리오 확정
 * @param {Object}  - API 문서 참조
 * @returns {Promise} - API 문서 참조
 */
export const confirmRebalancePortfolio = async ({assets, cash}) => {
	return axiosInstance.post('/rebalance/final', {assets, cash});
};
