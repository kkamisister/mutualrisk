import { Box, List, ListItem, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import StockSearchBar from 'pages/portfolio/create/StockSearchBar';
import { useState } from 'react';

const StockList = ({ assets }) => {
	const [clicked, setClicked] = useState(false);

	const handleClick = () => {
		setClicked(prev => !prev); // 이전 상태를 기반으로 상태를 업데이트
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
			<List>
				<StockSearchBar />

				{assets.map(asset => (
					<ListItem
						key={asset.assetId}
						onClick={handleClick}
						sx={{
							display: 'flex',
							alignItems: 'center',
							borderRadius: '8px',
							p: 2,
							bgcolor: clicked ? colors.sub.sub2 : 'transparent',
							'&:hover': {
								bgcolor: colors.sub.sub2,
							},
						}}>
						<img
							src={asset.imagePath} // src로 이미지 경로 전달
							alt={asset.name}
							style={{
								width: '100px',
								height: '100px',
								marginRight: '20px',
							}} // 간격과 크기 설정
						/>
						<Typography>{asset.name}</Typography>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default StockList;
