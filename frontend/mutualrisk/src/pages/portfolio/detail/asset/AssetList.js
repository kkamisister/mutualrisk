import React, { useState } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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

	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 5;

	// 전체 페이지 수 계산
	const totalPages = Math.ceil(assets.length / itemsPerPage);

	// 현재 페이지에 표시할 항목들
	const startIndex = currentPage * itemsPerPage;
	const currentAssets = assets.slice(startIndex, startIndex + itemsPerPage);

	const handleNextPage = () => {
		if (currentPage + 1 < totalPages) {
			setCurrentPage(prev => prev + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(prev => prev - 1);
		}
	};

	return (
		<Stack
			sx={{
				height: '500px',
				position: 'relative',
			}}>
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}>
				<Box sx={{ marginTop: '20px', minWidth: 0, flex: 1 }}>
					<Box sx={{ flex: 1 }}>
						{/* 여기서 currentAssets.map을 사용하여 현재 페이지의 항목들만 렌더링 */}
						{currentAssets.map((asset, index) => (
							<AssetListItem key={index} asset={asset} />
						))}
					</Box>
				</Box>
				{/* 페이지네이션 버튼 */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: '10px',
					}}>
					{/* 왼쪽 화살표 */}
					<IconButton
						onClick={handlePrevPage}
						disabled={currentPage === 0}
						sx={{
							color: currentPage === 0 ? 'grey' : 'black',
						}}>
						<ChevronLeftIcon fontSize="large" />
					</IconButton>

					{/* 현재 페이지 / 전체 페이지 */}
					<Typography variant="body1" sx={{ mx: 2 }}>
						{currentPage + 1} / {totalPages}
					</Typography>

					{/* 오른쪽 화살표 */}
					<IconButton
						onClick={handleNextPage}
						disabled={currentPage + 1 >= totalPages}
						sx={{
							color: currentPage + 1 >= totalPages ? 'grey' : 'black',
						}}>
						<ChevronRightIcon fontSize="large" />
					</IconButton>
				</Box>
			</Box>
		</Stack>
	);
};

export default AssetList;
