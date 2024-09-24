import React, { useState } from 'react';
import { Box } from '@mui/material';
import StockList from 'pages/portfolio/create/stocksearch/StockList';
import BasicButton from 'components/button/BasicButton';
import { colors } from 'constants/colors';
import StockSearchBar from './StockSearchBar';

const StockSearch = ({ onConfirm, selectedStocks, onStockSelect }) => {
	const mockData = {
		assets: [
			{
				assetId: 1498,
				name: '삼성스팩7호',
				code: '439250',
				imagePath: '/stockImage',
				imageName: '439250.svg',
				price: 10260.0,
				region: 'KR',
				expectedReturn: null,
				dailyPriceChangeRate: 0.0,
				dailyPriceChange: 0.0,
			},
			{
				assetId: 1501,
				name: '삼성전기',
				code: '009150',
				imagePath: '/stockImage',
				imageName: '009150.svg',
				price: 133000.0,
				region: 'KR',
				expectedReturn: null,
				dailyPriceChangeRate: 1.76,
				dailyPriceChange: 2300.0,
			},
			{
				assetId: 1499,
				name: '삼성스팩8호',
				code: '448740',
				imagePath: '/stockImage',
				imageName: '448740.svg',
				price: 9950.0,
				region: 'KR',
				expectedReturn: null,
				dailyPriceChangeRate: -0.2,
				dailyPriceChange: -20.0,
			},
			{
				assetId: 1497,
				name: '삼성스팩6호',
				code: '425290',
				imagePath: '/stockImage',
				imageName: '425290.svg',
				price: 2135.0,
				region: 'KR',
				expectedReturn: null,
				dailyPriceChangeRate: -1.39,
				dailyPriceChange: -30.0,
			},
			{
				assetId: 8134,
				name: '삼성제약',
				code: '001360',
				imagePath: '/stockImage',
				imageName: '001360.svg',
				price: 1666.0,
				region: 'KR',
				expectedReturn: null,
				dailyPriceChangeRate: 0.36,
				dailyPriceChange: 6.0,
			},
			{
				assetId: 1500,
				name: '삼성에스디에스',
				code: '018260',
				imagePath: '/stockImage',
				imageName: '018260.svg',
				price: 158000.0,
				region: 'KR',
				expectedReturn: null,
				dailyPriceChangeRate: -2.41,
				dailyPriceChange: -3900.0,
			},
			{
				assetId: 1496,
				name: '삼성생명',
				code: '032830',
				imagePath: '/stockImage',
				imageName: '032830.svg',
				price: 99900.0,
				region: 'KR',
				expectedReturn: null,
				dailyPriceChangeRate: -0.5,
				dailyPriceChange: -500.0,
			},
			{
				assetId: 1492,
				name: '삼성E&A',
				code: '028050',
				imagePath: '/stockImage',
				imageName: '028050.svg',
				price: 23850.0,
				region: 'KR',
				expectedReturn: null,
				dailyPriceChangeRate: -2.05,
				dailyPriceChange: -500.0,
			},
			{
				assetId: 1493,
				name: '삼성SDI',
				code: '006400',
				imagePath: '/stockImage',
				imageName: '006400.svg',
				price: 376500.0,
				region: 'KR',
				expectedReturn: null,
				dailyPriceChangeRate: 1.21,
				dailyPriceChange: 4500.0,
			},
			{
				assetId: 1494,
				name: '삼성공조',
				code: '006660',
				imagePath: '/stockImage',
				imageName: '006660.svg',
				price: 12950.0,
				region: 'KR',
				expectedReturn: null,
				dailyPriceChangeRate: -1.45,
				dailyPriceChange: -190.0,
			},
		],
	};

	return (
		<Box>
			<Box
				sx={{
					fontSize: '20px',
					fontWeight: 'bold',
					color: colors.text.main,
				}}>
				{'종목 검색'}
			</Box>
			<StockSearchBar />
			<StockList
				assets={mockData.assets}
				selectedStocks={selectedStocks}
				onStockSelect={onStockSelect}
				sx={{
					display: 'flex',
					flexDirection: 'row',
					overflowX: 'auto',
					whiteSpace: 'nowrap',
				}}
			/>
			<BasicButton
				onClick={() => onConfirm(selectedStocks)}
				sx={{ margin: '20px auto' }}>
				추가
			</BasicButton>
		</Box>
	);
};

export default StockSearch;
