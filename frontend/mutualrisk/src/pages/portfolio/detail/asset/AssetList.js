import React from 'react';
import { Box } from '@mui/material';
import AssetListItem from 'pages/portfolio/detail/asset/AssetListItem';

const AssetList = () => {
	// 예시 데이터
	const assets = [
		{
			name: '엔비디아',
			ticker: 'NVDA',
			market: 'NASDAQ',
			imagePath:
				'https://thumb.tossinvest.com/image/resized/96x0/https://static.toss.im/png-icons/securities/icn-sec-fill-NAS00208X-E0.png',
			currentPrice: '1,000,000',
			changeAmount: '3,323',
			changeRate: '7.3',
			ratio: '30',
		},
		{
			name: '엔비디아',
			ticker: 'NVDA',
			market: 'NASDAQ',
			imagePath:
				'https://thumb.tossinvest.com/image/resized/96x0/https://static.toss.im/png-icons/securities/icn-sec-fill-NAS00208X-E0.png',
			currentPrice: '1,000,000',
			changeAmount: '3,323',
			changeRate: '7.3',
			ratio: '30',
		},
		{
			name: '엔비디아',
			ticker: 'NVDA',
			market: 'NASDAQ',
			imagePath:
				'https://thumb.tossinvest.com/image/resized/96x0/https://static.toss.im/png-icons/securities/icn-sec-fill-NAS00208X-E0.png',
			currentPrice: '1,000,000',
			changeAmount: '3,323',
			changeRate: '7.3',
			ratio: '30',
		},
	];

	return (
		<Box sx={{ marginTop: '20px', minWidth: 0, flex: 1 }}>
			{assets.map((asset, index) => (
				<AssetListItem key={index} asset={asset} />
			))}
		</Box>
	);
};

export default AssetList;
