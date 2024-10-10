import React from 'react';
import { Box, Stack } from '@mui/material';
import AssetListItem from 'pages/portfolio/detail/asset/AssetListItem';

const AssetList = ({ assets, hoveredIndex }) => {
	const sortedAssets = assets
		.map((asset, index) => ({ ...asset, originalIndex: index }))
		.slice()
		.sort((a, b) => b.weight - a.weight);

	return (
		<Stack
			sx={{
				height: '400px',
				position: 'relative',
				overflowY: 'auto',
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				scrollbarWidth: 'none',
				msOverflowStyle: 'none',
			}}>
			<Box
				sx={{
					marginTop: '20px',
					minWidth: 0,
					flex: 1,
				}}>
				<Box sx={{ flex: 1 }}>
					{sortedAssets.map((asset, index) => (
						<AssetListItem
							key={index}
							asset={asset}
							highlight={hoveredIndex === asset.originalIndex}
						/>
					))}
				</Box>
			</Box>
		</Stack>
	);
};

export default AssetList;
