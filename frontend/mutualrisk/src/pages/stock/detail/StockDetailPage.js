import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import TradingViewWidget from './overseas/ChartWidget';
import TitleDivider from 'components/title/TitleDivider';
import { colors } from 'constants/colors';
import Button from '@mui/material/Button';
import ExchangeRateWidget from './overseas/ExchangeRateWidget';
import SymbolInfoWidget from './overseas/SymbolInfoWidget';
import OverseasInfoTab from './overseas/OverseasInfoTab';
import StockNewsTab from './StockNewsTab';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAssetByAssetId } from 'utils/apis/asset';
import OverseasDetailPage from './overseas/OverseasDetailPage';

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
			{data.assets[0].market === 'NASDAQ' && (
				<OverseasDetailPage assetInfo={data} />
			)}
		</Stack>
	);
};

export default StockDetailPage;
