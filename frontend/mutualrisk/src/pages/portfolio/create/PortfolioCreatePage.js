import React, { useState } from 'react';
import { Stack } from '@mui/material';
import BoxTitle from 'components/title/BoxTitle';
import StockSearch from 'pages/portfolio/create/stocksearch/StockSearch';
import StockList from 'pages/portfolio/create/stocksearch/StockList';
import ConditionSetting from 'pages/portfolio/create/ConditionSetting';

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

	const handleSearchConfirm = () => {};
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
				<Stack>
					<StockList
						selectedStocks={selectedStocks}
						onStockSelect={handleStockSelect}
					/>
				</Stack>
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
