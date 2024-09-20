import React, { useState } from 'react';
import { Stack } from '@mui/material';
import BoxTitle from 'components/title/BoxTitle';
import StockSearch from 'pages/portfolio/create/StockSearch';
import SelectedStockItems from 'pages/portfolio/create/SelectedStockitems';
import ConditionSetting from 'pages/portfolio/create/CondtionSetting';

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
					<SelectedStockItems onConfirm={handleItemsConfirm} />
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
