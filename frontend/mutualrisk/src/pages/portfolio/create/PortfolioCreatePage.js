import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import BoxTitle from 'components/title/BoxTitle';
import Title from 'components/title/Title';
import StockSearch from 'pages/portfolio/create/stocksearch/StockSearch';
import ConditionSetting from 'pages/portfolio/create/condition/ConditionSetting';
import { colors } from 'constants/colors';
import SelectedList from 'pages/portfolio/create/selectedstock/SelectedList';
import BasicButton from 'components/button/BasicButton';
import WidgetContainer from 'components/container/WidgetConatiner';

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
		<Box
			sx={{
				maxHeight: '100vh',
				overflowY: 'auto',
			}}>
			<BoxTitle title="포트폴리오 제작" />
			<Box display="flex" width="100%">
				<Box flex="4 1 0%" sx={{ minWidth: 0 }}>
					<StockSearch
						onConfirm={handleSearchConfirm}
						selectedStocks={selectedStocks}
						onStockSelect={handleStockSelect}
						sx={{
							maxHeight: '40vh',
							overflowY: 'auto',
						}}
					/>
					{showSelectedItems && (
						<SelectedList
							assets={selectedStocks}
							onStockSelect={handleStockSelect}
						/>
					)}
				</Box>
				<Box flex="6 1 0%">
					{showConditionSetting && (
						<ConditionSetting assets={selectedStocks} />
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default PortfolioCreatePage;
