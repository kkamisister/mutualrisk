import React from 'react';
import { Box, Stack } from '@mui/material';
import AssetListItem from 'pages/portfolio/detail/asset/AssetListItem';

const AssetList = ({ assets, hoveredIndex }) => {
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
					{assets.map((asset, index) => (
						<AssetListItem
							key={index}
							asset={asset}
							highlight={hoveredIndex === index}
						/>
					))}
				</Box>
			</Box>
		</Stack>
	);
};

export default AssetList;
