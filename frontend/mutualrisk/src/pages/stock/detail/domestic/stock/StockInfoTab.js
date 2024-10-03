import React from 'react';
import { Grid, Stack, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchStockDetailByAssetId } from 'utils/apis/asset';
import AssetProfileWidget from '../AssetProfileWidget';
import InvestorTradingWidget from './InvestorTradingWidget';
import ValueAssessmentWidget from './ValueAssessmentWidget';
import WidgetContainer from 'components/container/WidgetConatiner';

const StockInfoTab = ({ market, code, assetId }) => {
	const { isLoading, data } = useQuery({
		queryKey: ['domesticStockDetail'],
		queryFn: () => fetchStockDetailByAssetId(assetId),
	});

	return !isLoading ? (
		<Stack direction="column" spacing={1}>
			<AssetProfileWidget data={data} market={market} />
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
