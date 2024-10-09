import React from 'react';
import { Box, Stack } from '@mui/material';
import { colors } from 'constants/colors';
import StockItemCard from 'components/card/StockItemCard';

const PortfolioAssetListItem = ({ asset, highlight }) => {
	return (
		<Stack
			direction="row"
			sx={{
				// minWidth: '470px',
				maxWidth: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'stretch',
				marginBottom: '9px',
				borderRadius: '10px',
				transition: 'background-color 0.3s ease, border 0.3s ease',
			}}>
			<StockItemCard
				code={asset.code}
				name={asset.name}
				market={asset.market}
				image={`https://j11a607.p.ssafy.io/stockImage/${asset.code}.png`}
				sx={{
					backgroundColor: highlight
						? colors.background.box
						: colors.background.primary,
				}}
			/>

			<Box
				sx={{
					backgroundColor: highlight
						? colors.main.primary400
						: colors.main.primary200,
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
				{(asset.weight * 100).toFixed(1)}%
			</Box>
		</Stack>
	);
};

export default PortfolioAssetListItem;
