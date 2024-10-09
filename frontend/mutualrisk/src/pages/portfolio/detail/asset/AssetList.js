import React from 'react';
import { Box, Stack } from '@mui/material';
import AssetListItem from 'pages/portfolio/detail/asset/AssetListItem';

const AssetList = ({ assets, hoveredIndex }) => {
	return (
		<Stack
			sx={{
				height: '400px',
				position: 'relative',
				overflowY: 'auto', // 세로 스크롤 적용
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
							highlight={hoveredIndex === index} // 현재 hover된 항목 강조
						/>
					))}
				</Box>
			</Box>
		</Stack>
	);
};

export default AssetList;
