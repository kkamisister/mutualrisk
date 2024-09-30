import React from 'react';
import { Stack, Box, Avatar, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import PortfolioAssetListItem from 'pages/portfolio/rebalance/main/piechart/PortfolioAssetListItem';

const PortfolioAssetList = () => {
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
		{
			name: '애플',
			ticker: 'AAPL',
			market: 'NASDAQ',
			imagePath: 'https://.../apple.png',
			currentPrice: '2,000,000',
			changeAmount: '4,500',
			changeRate: '5.2',
			ratio: '25',
		},
		{
			name: '테슬라',
			ticker: 'TSLA',
			market: 'NASDAQ',
			imagePath: 'https://.../tesla.png',
			currentPrice: '3,000,000',
			changeAmount: '6,000',
			changeRate: '8.1',
			ratio: '40',
		},
		{
			name: '구글',
			ticker: 'GOOGL',
			market: 'NASDAQ',
			imagePath: 'https://.../google.png',
			currentPrice: '4,000,000',
			changeAmount: '7,500',
			changeRate: '6.3',
			ratio: '50',
		},
		{
			name: '마이크로소프트',
			ticker: 'MSFT',
			market: 'NASDAQ',
			imagePath: 'https://.../microsoft.png',
			currentPrice: '5,000,000',
			changeAmount: '8,000',
			changeRate: '9.2',
			ratio: '45',
		},
	];

	return (
		<Stack
			sx={{
				height: '400px',
				overflow: 'hidden', // 컨테이너 영역을 넘지 않게 설정
				padding: '10px',
			}}>
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					overflowY: 'auto',
					scrollbarWidth: 'none',
					'& .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar':
						{
							display: 'none',
						},
					'& .react-horizontal-scrolling-menu--scroll-container': {
						scrollbarWidth: 'none',
						'-ms-overflow-style': 'none',
					},
				}}>
				<Box sx={{ marginTop: '20px', minWidth: 0, flex: 1 }}>
					<Box sx={{ flex: 1 }}>
						{/* 여기서 currentAssets.map을 사용하여 현재 페이지의 항목들만 렌더링 */}
						{assets.map((asset, index) => (
							<PortfolioAssetListItem key={index} asset={asset} />
						))}
					</Box>
				</Box>
			</Box>
		</Stack>
	);
};

export default PortfolioAssetList;
