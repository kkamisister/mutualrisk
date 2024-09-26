import React from 'react';
import { Stack } from '@mui/material';
import AssetRatioPieChart from 'pages/portfolio/detail/asset/AssetRatioPieChart';
import AssetList from 'pages/portfolio/detail/asset/AssetList';

const AssetRatio = () => {
	return (
		<Stack
			spacing={2}
			direction="row"
			sx={{
				width: '100%',
				// minWidth: '1000psx',
				height: '100%',
				maxHeight: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				// alignItems: 'stretch',
				alignItems: 'center',
				flexWrap: 'nowrap',
			}}>
			{/* <AssetRatioPieChart sx={{ flex: 1 }} /> */}
			<AssetRatioPieChart sx={{ width: '50%' }} />
			{/* <AssetList sx={{ flex: 1 }} /> */}
			<AssetList sx={{ width: '50%' }} />
		</Stack>
	);
};

export default AssetRatio;
