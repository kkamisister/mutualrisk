import React from 'react';
import { Grid, Stack, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchEtfByAssetId } from 'utils/apis/asset';
import WidgetContainer from 'components/container/WidgetConatiner';
import AssetProfileWidget from '../AssetProfileWidget';
import EtfCompositionWidget from './EtfCompositionWidget';
const mockData = {
	status: 200,
	message: '종목 상세정보 조회에 성공하였습니다',
	data: {
		etfNum: 10,
		assetId: 15,
		code: '426330',
		summary:
			'1. Qontigo에서 발표하는 STOXX USA ETF INDUSTRY 지수를 기초지수로 하여, 1좌당 순자산가치의 일간변동률을 기초지수 일간변동률에 연동되도록 투자신탁재산을 운용합니다.<br>2. Qontigo에서 발표하는 STOXX USA Total Market Index 종목들 중 시총 $500mil 이상 및 기준일 직전 6개월 거래대금 $2mil 이상 종목들을 선정합니다. 선정된 종목 중  ETF 산업(자산운용사, 수탁사, 금융 투자서비스 등) 관련한  기업을 선별 후 해당 기업의 전체 매출 중 ETF관련 매출 비중이 50%넘는 기업들을 선정. 선정된 기업들 중 시가총액 기준 상위 20개 종목 편입하여 운용하며 종목당 CAP은 10%입니다.',
		name: 'KOSEF 미국ETF산업STOXX',
		portfolio: [
			{
				assetName: 'SCHWAB (CHARLES) CORP',
				stockCount: '590',
			},
			{
				assetName: 'INVESCO LTD',
				stockCount: '395',
			},
			{
				assetName: 'NASDAQ INC',
				stockCount: '332',
			},
			{
				assetName: 'INTERCONTINENTAL EXCHANGE IN',
				stockCount: '318',
			},
			{
				assetName: 'STATE STREET CORP',
				stockCount: '268',
			},
			{
				assetName: 'FRANKLIN RESOURCES INC',
				stockCount: '262',
			},
			{
				assetName: 'CME GROUP INC',
				stockCount: '219',
			},
			{
				assetName: 'T ROWE PRICE GROUP INC',
				stockCount: '190',
			},
			{
				assetName: 'RAYMOND JAMES FINANCIAL INC',
				stockCount: '162',
			},
			{
				assetName: 'JANUS HENDERSON GROUP PLC',
				stockCount: '137',
			},
		],
	},
};
const StockInfoTab = ({ market, code, assetId }) => {
	const { isLoading, data } = useQuery({
		queryKey: ['domesticStockDetail'],
		queryFn: () => fetchEtfByAssetId(assetId),
	});
	return !isLoading ? (
		<Grid container sx={{ justifyContent: 'space-between' }}>
			<Grid item xs={4.95}>
				<AssetProfileWidget data={data} market={market} />
			</Grid>
			<Grid item xs={6.95}>
				<EtfCompositionWidget data={data.portfolio} />
			</Grid>
		</Grid>
	) : (
		// <Stack spacing={1}>
		// 	<AssetProfileWidget data={data} market={market} />
		// 	<EtfCompositionWidget data={data.portfolio} />
		// </Stack>
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
