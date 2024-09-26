import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import BoxTitle from 'components/title/BoxTitle';
import Title from 'components/title/Title';
import StockSearch from 'pages/portfolio/create/stocksearch/StockSearch';
import ConditionSetting from 'pages/portfolio/create/condition/ConditionSetting';
import { colors } from 'constants/colors';
import SelectedList from 'pages/portfolio/create/selectedstock/SelectedList';
import BasicButton from 'components/button/BasicButton';

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
		console.log('이제 제약조건 설정을 보여주거라');
		setShowConditionSetting(true);
	};

	return (
		<Box display="flex" width="100%">
			<Box
				flex="4 1 0%"
				sx={{
					maxWidth: '40%',
				}}>
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
							backgroundColor: colors.background.white,
						}}>
						<Title text="담은 종목" />
						<SelectedList
							assets={selectedStocks}
							onStockSelect={handleStockSelect}
						/>
						<BasicButton onClick={handleItemsConfirm}>
							포트폴리오 제작
						</BasicButton>
					</Box>
				)}
			</Box>
			<Box flex="6 1 0%">{showConditionSetting && <ConditionSetting />}</Box>
		</Box>
	);
};

export default PortfolioCreatePage;
