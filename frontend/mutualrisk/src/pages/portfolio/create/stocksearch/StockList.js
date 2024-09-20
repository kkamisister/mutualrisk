import { Box, List } from '@mui/material';
import { colors } from 'constants/colors';
import StockSearchBar from 'pages/portfolio/create/stocksearch/StockSearchBar';
import StockListItem from 'pages/portfolio/create/stocksearch/StockListItem';

const StockList = ({ assets }) => {
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
			<List
				sx={{
					display: 'flex',
					flexDirection: 'row',
				}}>
				{assets.map(asset => (
					<StockListItem
						key={asset.assetId}
						name={asset.name}
						imagePath={asset.imagePath}
						imageName={asset.imageName}
					/>
				))}
			</List>
		</Box>
	);
};

export default StockList;
