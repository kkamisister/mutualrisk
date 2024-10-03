import React from 'react';
import { Grid, Stack, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchStockDetailByAssetId } from 'utils/apis/asset';
import StockProfileWidget from './StockProfileWidget';
import InvestorTradingWidget from './InvestorTradingWidget';
import ValueAssessmentWidget from './ValueAssessmentWidget';
import WidgetContainer from 'components/container/WidgetConatiner';

const mockData = {
	recordNum: 5,
	assetId: 1235,
	name: '삼성증권',
	code: '016360',
	summary: '',
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
const StockInfoTab = ({ market, code, assetId }) => {
	const { isLoading, data } = useQuery({
		queryKey: ['domesticStockDetail'],
		queryFn: () => fetchStockDetailByAssetId(assetId),
	});

	return !isLoading ? (
		<Stack direction="column" spacing={1}>
			<StockProfileWidget data={data} market={market} />
			<Grid container sx={{ justifyContent: 'space-between' }}>
				<Grid item xs={7.95}>
					<InvestorTradingWidget records={data.records} />
				</Grid>
				<Grid item xs={3.95}>
					<ValueAssessmentWidget data={data} />
				</Grid>
			</Grid>
		</Stack>
	) : (
		<WidgetContainer
			direction="column"
			spacing={1}
			sx={{
				justifyContent: 'center',
				alignItems: 'center',
				height: '600px',
			}}>
			<CircularProgress />
		</WidgetContainer>
	);
};

export default StockInfoTab;
