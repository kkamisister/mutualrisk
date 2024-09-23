import React, { useState } from 'react';
import { Box } from '@mui/material';
import StockList from 'pages/portfolio/create/stocksearch/StockList';
import BasicButton from 'components/button/BasicButton';
import { colors } from 'constants/colors';
import StockSearchBar from './StockSearchBar';

const StockSearch = ({ onConfirm, selectedStocks, onStockSelect }) => {
	const mockData = {
		assetNum: 10,
		assets: [
			{
				assetId: 34,
				name: '삼성전자',
				code: '005930',
				imagePath:
					'http://sanriokorea.co.kr/wp-content/themes/sanrio/images/new_main_crt7.png',
				imageName: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				price: 74500,
				currency: 'KRW',
				return: 0.72,
			},
			{
				assetId: 1,
				name: '삼성화재',
				code: '000810',
				imagePath:
					'http://sanriokorea.co.kr/wp-content/themes/sanrio/images/new_main_crt4.png',
				imageName: 'd3fdsed-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				price: 377000,
				currency: 'KRW',
				return: -5.72,
			},
			{
				assetId: 2,
				name: '삼성전자',
				code: '005930',
				imagePath:
					'http://sanriokorea.co.kr/wp-content/themes/sanrio/images/new_main_crt7.png',
				imageName: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				price: 74500,
				currency: 'KRW',
				return: 0.72,
			},
			{
				assetId: 3,
				name: '삼성화재',
				code: '000810',
				imagePath:
					'http://sanriokorea.co.kr/wp-content/themes/sanrio/images/new_main_crt4.png',
				imageName: 'd3fdsed-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				price: 377000,
				currency: 'KRW',
				return: -5.72,
			},
			{
				assetId: 4,
				name: '삼성전자',
				code: '005930',
				imagePath:
					'http://sanriokorea.co.kr/wp-content/themes/sanrio/images/new_main_crt7.png',
				imageName: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				price: 74500,
				currency: 'KRW',
				return: 0.72,
			},
			{
				assetId: 5,
				name: '삼성화재',
				code: '000810',
				imagePath:
					'http://sanriokorea.co.kr/wp-content/themes/sanrio/images/new_main_crt4.png',
				imageName: 'd3fdsed-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				price: 377000,
				currency: 'KRW',
				return: -5.72,
			},
			{
				assetId: 6,
				name: '삼성전자',
				code: '005930',
				imagePath:
					'http://sanriokorea.co.kr/wp-content/themes/sanrio/images/new_main_crt7.png',
				imageName: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				price: 74500,
				currency: 'KRW',
				return: 0.72,
			},
			{
				assetId: 11,
				name: '삼성화재',
				code: '000810',
				imagePath:
					'http://sanriokorea.co.kr/wp-content/themes/sanrio/images/new_main_crt4.png',
				imageName: 'd3fdsed-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				price: 377000,
				currency: 'KRW',
				return: -5.72,
			},
			{
				assetId: 111,
				name: '삼성전자',
				code: '005930',
				imagePath:
					'http://sanriokorea.co.kr/wp-content/themes/sanrio/images/new_main_crt7.png',
				imageName: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				price: 74500,
				currency: 'KRW',
				return: 0.72,
			},
			{
				assetId: 22,
				name: '삼성화재',
				code: '000810',
				imagePath:
					'http://sanriokorea.co.kr/wp-content/themes/sanrio/images/new_main_crt4.png',
				imageName: 'd3fdsed-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				price: 377000,
				currency: 'KRW',
				return: -5.72,
			},
			{
				assetId: 34,
				name: '삼성전자',
				code: '005930',
				imagePath:
					'http://sanriokorea.co.kr/wp-content/themes/sanrio/images/new_main_crt7.png',
				imageName: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				price: 74500,
				currency: 'KRW',
				return: 0.72,
			},
			{
				assetId: 5922,
				name: '삼성화재',
				code: '000810',
				imagePath:
					'http://sanriokorea.co.kr/wp-content/themes/sanrio/images/new_main_crt4.png',
				imageName: 'd3fdsed-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				price: 377000,
				currency: 'KRW',
				return: -5.72,
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
