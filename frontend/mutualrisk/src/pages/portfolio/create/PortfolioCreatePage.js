import React, { useState } from 'react';
import { Stack } from '@mui/material';
import BoxTitle from 'components/title/BoxTitle';
import StockSearch from 'pages/portfolio/create/stocksearch/StockSearch';
import StockListItem from 'pages/portfolio/create/stocksearch/StockListItem';
import ConditionSetting from 'pages/portfolio/create/ConditionSetting';

const PortfolioCreatePage = () => {
	const [showSelectedItems, setShowSelectedItems] = useState(false);
	const [showConditionSetting, setShowConditionSetting] = useState(false);

	const handleSearchConfirm = () => {
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
				<StockSearch onConfirm={handleSearchConfirm} />
			</Stack>
			{showSelectedItems && (
				<Stack>
					<StockListItem onConfirm={handleItemsConfirm} />
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
