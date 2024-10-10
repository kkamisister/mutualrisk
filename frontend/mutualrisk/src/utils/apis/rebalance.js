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
export const createRebalancePortfolio = async ({
	extraAssetId = null,
	extraCash = 0,
}) => {
	return axiosInstance.post('/portfolio/rebalance/init', {
		extraAssetId,
		extraCash,
	});
};

/**
 * 포트폴리오 추천 자산 정보 반환
 *
 * @param {Object} params - 추천 자산 요청에 필요한 정보
 * @param {Number} params.totalCash - 포트폴리오의 총 금액
 * @param {Number[]} params.lowerBounds - 각 자산의 최소 비율 배열
 * @param {Number[]} params.upperBounds - 각 자산의 최대 비율 배열
 * @param {Array<Number|null>} params.exactProportion - 각 자산의 정확한 비율 배열, null일 수 있음
 * @param {Object[]} params.newPortfolioAssetInfoList - 새로운 포트폴리오에 포함될 자산 리스트
 * @returns {Promise} - 추천 자산 정보를 반환하는 API 응답을 포함한 Promise 객체
 */
export const receiveRecommendAsset = async ({
	totalCash,
	lowerBounds,
	upperBounds,
	exactProportion,
	newPortfolioAssetInfoList,
}) => {
	return axiosInstance.post('/portfolio/recommend', {
		totalCash,
		lower_bounds: lowerBounds,
		upper_bounds: upperBounds,
		exact_proportion: exactProportion,
		newPortfolioAssetInfoList,
	});
};

//  * 포트폴리오 제작 시 백테스팅 결과 요청
export const finalBackTest = async (
	newPortfolioAssetInfoList,
	timeInterval = 'day',
	measure = 'profit'
) => {
	const params = {
		timeInterval,
		measure,
	};

	const response = await axiosInstance.post(
		`/portfolio/backtest`,
		newPortfolioAssetInfoList,
		{
			params,
		}
	);

	return response.data.data;
};
