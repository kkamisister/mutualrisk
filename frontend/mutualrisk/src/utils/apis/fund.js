import axiosInstance from './axiosInstance';

// 펀드 투자목록 관련 API
// React-Query 단에서 Mutate가 요구되는 API들(POST, DELETE)은 Promise를 반환하도록
// 그 외, fetch만 필요한 API들(GET)은 실제 API 응답의 data 맴버 내 실제 데이터를 반환

/**
 * 펀드 목록 조회
 * @returns {Object} - Response 내 data 객체, API 문서 참조
 */
export const fetchFundList = async keyword => {
	const response = await axiosInstance.get('/funds');
	return response.data.data;
};

/**
 * 펀드 상세 정보 조회
 * @param {Number} fundId - fundId
 * @returns {Object} - Response 내 data 객체, API 문서 참조
 */
export const fetchFundByFundId = async fundId => {
	const response = await axiosInstance.get(`/funds/${fundId}`);
	return response.data.data;
};

/**
 * 펀드 평가액 변동 기록 조회
 * [추후 회사 이름으로 조회하는 부분은 변경될 소지가 있음]
 * - 한 틱은 분기단위(3개월)
 * - 1년 3년 5년으로 요청을 받아서 반환
 * - 수익률을 반환한다(3개월 기준 수익률)
 * @typedef {String} company - 회사 이름
 * @typedef {Number} period - 조회 기간 (1, 3, 5)
 * @param {{company, period}}
 * @returns {Object} - Response 내 data 객체, API 문서 참조
 */
export const fetchFundEvaluateFluctuateByCompany = async ({
	company,
	period,
}) => {
	const response = await axiosInstance.get(
		`/funds/history?company=${company}&period=${period}`
	);
	return response.data.data;
};
