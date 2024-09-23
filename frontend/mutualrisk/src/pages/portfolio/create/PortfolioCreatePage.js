import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import BoxTitle from 'components/title/BoxTitle';
import StockSearch from 'pages/portfolio/create/stocksearch/StockSearch';
import StockListItem from './stocksearch/StockListItem';
import StockList from 'pages/portfolio/create/stocksearch/StockList';
import ConditionSetting from 'pages/portfolio/create/ConditionSetting';
import { colors } from 'constants/colors';

const PortfolioCreatePage = () => {
	const [showSelectedItems, setShowSelectedItems] = useState(false);
	const [showConditionSetting, setShowConditionSetting] = useState(false);
	const [selectedStocks, setSelectedStocks] = useState([]);

	const handleStockSelect = stock => {
		if (selectedStocks.find(selected => selected.assetId === stock.assetId)) {
			setSelectedStocks(
				selectedStocks.filter(
					selected => selected.assetId !== stock.assetId
				)
			);
		} else {
			setSelectedStocks([...selectedStocks, stock]);
		}
	};

	const handleSearchConfirm = selectedItems => {
		setSelectedStocks(selectedItems);
		setShowSelectedItems(true);
	};
	const handleItemsConfirm = () => {
		setShowConditionSetting(true);
	};

	return (
		<Stack>
			<Stack>
				<BoxTitle title="포트폴리오 제작" />
			</Stack>
			<Stack>
				<StockSearch
					onConfirm={handleSearchConfirm}
					selectedStocks={selectedStocks}
					onStockSelect={handleStockSelect}
				/>
			</Stack>
			{showSelectedItems && (
				<Box
					sx={{
						backgroundColor: colors.background.box,
					}}>
					<Box
						sx={{
							fontSize: '20px',
							fontWeight: 'bold',
							color: colors.text.main,
						}}>
						{'담은 종목'}
					</Box>
					<StockList
						assets={selectedStocks}
						selectedStocks={selectedStocks}
						onStockSelect={handleStockSelect}
					/>
				</Box>
			)}
			{showConditionSetting && (
				<Stack>
					<ConditionSetting />
				</Stack>
			)}
		</Stack>
	);
};

export default PortfolioCreatePage;
