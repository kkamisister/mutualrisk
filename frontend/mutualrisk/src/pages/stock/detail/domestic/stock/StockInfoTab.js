import React from 'react';
import { Grid, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchStockDetailByAssetId } from 'utils/apis/asset';
import StockProfileWidget from './StockProfileWidget';
import InvestorTradingWidget from './InvestorTradingWidget';
import ValueAssessmentWidget from './ValueAssessmentWidget';
const mockData = {
	recordNum: 5,
	assetId: 1235,
	name: '삼성증권',
	code: '016360',
	summary:
		'1982년 국제증권으로 설립된 동사는 1992년 삼성그룹에 편입되면서 사명을 삼성증권으로 변경함. 차별화된 부유층 고객기반, 업계 최고의 자산관리 역량과 인프라를 바탕으로 고객 니즈에 적합한 맞춤형 상품 및 서비스를 선제적으로 제공하는 등 업계 선도사의 위상을 유지하고 있음. 당분기말 기준 본점 외 28개 국내지점, 2개 해외사무소(동경, 북경)가 있으며, 삼성선물 및 해외법인 등의 종속기업이 있음.',
	marketValue: '3조 9,694억',
	per: '6.07배',
	pbr: '0.57배',
	eps: '7,326원',
	records: [
		{
			date: '2024-09-13T00:00:00',
			foreignerPureBuyQuant: 3014,
			foreignerHoldRatio: 30.76,
			organPureBuyQuant: 68278,
			individualPureBuyQuant: -70044,
			accumulatedTradingVolume: 191057,
		},
		{
			date: '2024-09-12T00:00:00',
			foreignerPureBuyQuant: 57626,
			foreignerHoldRatio: 30.76,
			organPureBuyQuant: -46520,
			individualPureBuyQuant: -13038,
			accumulatedTradingVolume: 314290,
		},
		{
			date: '2024-09-11T00:00:00',
			foreignerPureBuyQuant: 13976,
			foreignerHoldRatio: 30.69,
			organPureBuyQuant: -69392,
			individualPureBuyQuant: 43807,
			accumulatedTradingVolume: 364283,
		},
		{
			date: '2024-09-10T00:00:00',
			foreignerPureBuyQuant: 13368,
			foreignerHoldRatio: 30.8,
			organPureBuyQuant: -329,
			individualPureBuyQuant: -13116,
			accumulatedTradingVolume: 191065,
		},
		{
			date: '2024-09-09T00:00:00',
			foreignerPureBuyQuant: 34754,
			foreignerHoldRatio: 30.79,
			organPureBuyQuant: 10764,
			individualPureBuyQuant: -45980,
			accumulatedTradingVolume: 263324,
		},
	],
};
const StockInfoTab = ({ assetId }) => {
	const { isLoading, data } = useQuery({
		queryKey: ['stockSearchResult'],
		queryFn: () => fetchStockDetailByAssetId(assetId),
		placeholderData: mockData,
	});

	return (
		<Stack direction="column" spacing={1}>
			=
			<StockProfileWidget data={data} />
			<Grid container sx={{ justifyContent: 'space-between' }}>
				<Grid item xs={7.95}>
					<InvestorTradingWidget records={data.records} />
				</Grid>
				<Grid item xs={3.95}>
					<ValueAssessmentWidget data={data} />
				</Grid>
			</Grid>
		</Stack>
	);
};

export default StockInfoTab;
