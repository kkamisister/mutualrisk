import React from 'react';
import { Box, Button, List, ListItem } from '@mui/material';
import StockSearchItems from 'pages/portfolio/create/StockSearchItems';

const StockSearch = ({ onConfirm }) => {
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
				assetId: 59,
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
				assetId: 59,
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
				assetId: 59,
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
				assetId: 59,
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
				assetId: 59,
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
				assetId: 59,
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
			<Box>종목 검색</Box>
			<List
				sx={{
					display: 'flex',
					flexDirection: 'row',
					overflowX: 'auto',
					whiteSpace: 'nowrap',
				}}>
				{mockData.assets.map(asset => (
					<ListItem key={asset.assetId}>
						<StockSearchItems
							name={asset.name}
							imagePath={asset.imagePath}
						/>
					</ListItem>
				))}
			</List>
			<Button
				variant="contained"
				onClick={onConfirm}
				sx={{ display: 'block', margin: '20px auto' }}>
				추가
			</Button>
		</Box>
	);
};

export default StockSearch;
