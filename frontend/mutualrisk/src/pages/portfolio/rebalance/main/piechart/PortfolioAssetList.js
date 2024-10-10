import React from 'react';
import { Box, Stack } from '@mui/material';
import PortfolioAssetListItem from 'pages/portfolio/rebalance/main/piechart/PortfolioAssetListItem';

const PortfolioAssetList = ({ assets, hoveredIndex }) => {
	return (
		<Stack
			sx={{
				height: '400px',
				// height: '100%',
				position: 'relative',
				overflow: 'hidden',
			}}>
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					overflowY: 'auto',
					'&::-webkit-scrollbar': {
						display: 'none',
					},
					scrollbarWidth: 'none',
					msOverflowStyle: 'none',
				}}>
				<Box sx={{ flex: 1 }}>
					{assets.map((asset, index) => (
						<PortfolioAssetListItem
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

export default PortfolioAssetList;
