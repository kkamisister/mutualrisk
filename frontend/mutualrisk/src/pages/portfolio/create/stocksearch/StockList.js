import { Box, List } from '@mui/material';
import { colors } from 'constants/colors';
import StockListItem from 'pages/portfolio/create/stocksearch/StockListItem';
import { useState, useRef, useCallback } from 'react';
import HorizontalScrollContainer from 'components/scroll/HorizontalScrollContainer';

const StockList = ({ assets, selectedStocks, onStockSelect }) => {
	return (
		<HorizontalScrollContainer>
			<List
				sx={{
					display: 'flex',
					flexDirection: 'row',

					m: '10px',
				}}>
				{assets &&
					assets.map(asset => (
						<StockListItem
							key={asset.assetId}
							name={asset.name}
							imagePath={asset.imagePath}
							imageName={asset.imageName}
							clicked={selectedStocks.some(
								selected => selected.assetId === asset.assetId
							)}
							onClick={() => onStockSelect(asset)}
						/>
					))}
			</List>
		</HorizontalScrollContainer>
	);
};

export default StockList;
