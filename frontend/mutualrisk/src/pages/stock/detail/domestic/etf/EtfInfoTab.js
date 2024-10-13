import React from 'react';
import { Grid, Stack, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchEtfByAssetId } from 'utils/apis/asset';
import WidgetContainer from 'components/container/WidgetConatiner';
import AssetProfileWidget from '../AssetProfileWidget';
import EtfCompositionWidget from './EtfCompositionWidget';

const StockInfoTab = ({ market, code, assetId }) => {
	const { isLoading, data } = useQuery({
		queryKey: ['domesticStockDetail'],
		queryFn: () => fetchEtfByAssetId(assetId),
	});
	return !isLoading ? (
		// <Grid container sx={{ justifyContent: 'space-between' }}>
		// 	<Grid item xs={4.95}>
		// 		<AssetProfileWidget data={data} market={market} />
		// 	</Grid>
		// 	<Grid item xs={6.95}>
		// 		<EtfCompositionWidget data={data.portfolio} />
		// 	</Grid>
		// </Grid>
		<Stack spacing={1}>
			<AssetProfileWidget data={data} market={market} />
			<EtfCompositionWidget data={data.portfolio} />
		</Stack>
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
