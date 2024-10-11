import React from 'react';
import { Stack } from '@mui/material';
import TitleDivider from 'components/title/TitleDivider';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAssetByAssetId } from 'utils/apis/asset';
import OverseasDetailPage from './overseas/OverseasDetailPage';
import DomesticDetailPage from './domestic/DomesticDetailPage';

const StockDetailPage = () => {
	const params = useParams();
	const assetId = params.assetId;
	const { isLoading, data } = useQuery({
		queryKey: ['assetDetail', assetId], // keyword를 queryKey에 포함하여 키워드가 변경되면 새로운 요청 실행
		queryFn: () => fetchAssetByAssetId(assetId),
		placeholderData: {
			assets: [{ market: null }],
		},
	});

	return (
		<Stack sx={{ height: '100%' }} spacing={1}>
			<TitleDivider text="주식 상세 정보" />
			{['AMEX', 'NASDAQ', 'NYSE'].includes(data.assets[0].market) && (
				<OverseasDetailPage assetInfo={data} />
			)}
			{['KOSPI', 'KOSDAQ', 'KONEX', 'ETF', 'KOSDAQ_GLOBAL'].includes(
				data.assets[0].market
			) && <DomesticDetailPage assetInfo={data} />}
		</Stack>
	);
};

export default StockDetailPage;
