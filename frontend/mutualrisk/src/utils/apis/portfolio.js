import axiosInstance from './axiosInstance';

// 포트폴리오 제작 관련 API
// React-Query 단에서 Mutate가 요구되는 API들(POST, DELETE)은 Promise를 반환하도록
// 그 외, fetch만 필요한 API들(GET)은 실제 API 응답의 data 맴버 내 실제 데이터를 반환

/**
 * 포트폴리오 제작
 * @typedef {{
 *      totalCash: Number,
 *      assetIds : Array(Number),
 *      lowerBounds: Array(Number),
 *      upperBounds: Array(Number),
 *      exactProportion: Array(Number||null)
 *  }} portfolioPreConfig
 *
 * @param {portfolioPreConfig}
 * @returns {Object} - API 문서 참조
 */
export const createPortfolio = async ({
	totalCash,
	assetIds,
	lowerBounds,
	upperBounds,
	exactProportion,
}) => {
	return axiosInstance.post('/portfolio/init', {
		totalCash,
		assetIds,
		lower_bounds: lowerBounds,
		upper_bounds: upperBounds,
		exact_proportion: exactProportion,
	});
};

/**
 * 포트폴리오 확정
 * @typedef {{
 *  assets : [
 * 		{
 * 		    assetId : Number,
 * 		    weight : Number,
 * 		    purchaseNum : Number,
 * 		    purchaseAmount : Number
 * 	    },
 *  ],
 *  cash : Number
 * }} portfolioConfirmConfig
 *
 * @param {portfolioConfirmConfig}
 * @returns {Object} - API 문서 참조
 */
export const confirmPortfolio = async ({
	name,
	totalCash,
	assetIds,
	lower_bounds,
	upper_bounds,
	exact_proportion,
}) => {
	return axiosInstance.post('/portfolio/final', {
		name,
		totalCash,
		assetIds,
		lower_bounds,
		upper_bounds,
		exact_proportion,
	});
};
