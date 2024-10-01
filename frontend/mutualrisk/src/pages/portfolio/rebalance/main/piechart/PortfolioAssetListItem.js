import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { colors } from 'constants/colors';
import StockItemCard from 'components/card/StockItemCard';

const AssetListItem = ({ asset }) => {
	return (
		<Stack
			direction="row"
			sx={{
				width: '500px',
				maxWidth: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'stretch',
				marginBottom: '9px',
			}}>
			<StockItemCard
				code={asset.ticker}
				name={asset.name}
				market={asset.market}
				image={asset.imagePath}></StockItemCard>
			<Box
				sx={{
					backgroundColor: colors.main.primary400,
					padding: '10px',
					borderRadius: '10px',
					color: '#FFFFFF',
					minWidth: '60px',
					textAlign: 'center',
					fontSize: '20px',
					fontWeight: 'bold',
					marginLeft: '9px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flex: 1,
				}}>
				{asset.ratio}%
			</Box>
		</Stack>
	);
};

export default AssetListItem;
