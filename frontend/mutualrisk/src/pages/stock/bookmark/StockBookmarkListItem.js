import React from 'react';
import { Box, Stack, Avatar } from '@mui/material';
import { colors } from 'constants/colors';
import StockItemCard from 'components/card/StockItemCard';

const StockBookmarkListItem = ({ asset }) => {
	return (
		<StockItemCard
			code={asset.code}
			name={asset.name}
			market={asset.market}
			image={`https://j11a607.p.ssafy.io${asset.imagePath}/${asset.code}.png`}>
			<Stack
				direction="column"
				spacing={0.5}
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Box sx={{ fontSize: '12px', color: colors.text.main }}>
					{Math.round(asset.price).toLocaleString()} KRW
				</Box>
				<Box
					sx={{
						color:
							Number(asset.dailyPriceChangeRate) > 0
								? colors.point.red
								: colors.point.blue,
						fontSize: '12px',
					}}>
					{Math.round(asset.dailyPriceChange) > 0 && '+'}
					{`${Math.round(asset.dailyPriceChange).toLocaleString()} (${
						asset.dailyPriceChangeRate
					}%)`}
				</Box>
			</Stack>
		</StockItemCard>
	);
};

export default StockBookmarkListItem;
