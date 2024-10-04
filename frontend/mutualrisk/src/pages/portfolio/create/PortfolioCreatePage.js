import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import BoxTitle from 'components/title/BoxTitle';
import StockSearch from 'pages/portfolio/create/stocksearch/StockSearch';
import ConditionSetting from 'pages/portfolio/create/condition/ConditionSetting';
import { colors } from 'constants/colors';
import SelectedList from 'pages/portfolio/create/selectedstock/SelectedList';
import AssetInputModal from 'pages/portfolio/create/AssetInputModal';
import SuccessSnackbar from 'components/snackbar/SuccessSnackbar';
import { fetchPortfolioList } from 'utils/apis/analyze';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const PortfolioCreatePage = () => {
	const [showSelectedItems, setShowSelectedItems] = useState(false);
	const [showConditionSetting, setShowConditionSetting] = useState(false);
	const [selectedStocks, setSelectedStocks] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [openAddSnackbar, setOpenAddSnackbar] = useState(false);
	const [openRemoveSnackbar, setOpenRemoveSnackbar] = useState(false);
	const [hasPortfolio, setHasPortfolio] = useState(true);

	const { data, isLoading, isError } = useQuery({
		queryKey: ['portfolioList'],
		queryFn: fetchPortfolioList,
		onSuccess: data => {
			setHasPortfolio(data.hasPortfolio);
		},
	});

	const handleStockSelect = stock => {
		if (selectedStocks.find(selected => selected.assetId === stock.assetId)) {
			setSelectedStocks(
				selectedStocks.filter(
					selected => selected.assetId !== stock.assetId
				)
			);
			setOpenRemoveSnackbar(true);
		} else {
			setSelectedStocks([...selectedStocks, stock]);
		}
	};
	const handleAddSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenAddSnackbar(false);
	};

	const handleRemoveSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenRemoveSnackbar(false);
	};

	const handleSearchConfirm = selectedItems => {
		setOpenAddSnackbar(true);
		setSelectedStocks(selectedItems);
		setShowSelectedItems(true);
	};
	const handleItemsConfirm = () => {
		setShowConditionSetting(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	return (
		<Stack spacing={1}>
			<BoxTitle title="포트폴리오 제작" />
			<Box display="flex" width="100%" gap={2}>
				<Box width="40%">
					<StockSearch
						onConfirm={handleSearchConfirm}
						selectedStocks={selectedStocks}
						onStockSelect={handleStockSelect}
						sx={{
							height: '40vh',
							overflowY: 'auto',
							boxSizing: 'border-box',
							mb: 2,
						}}
					/>
					{showSelectedItems && (
						<SelectedList
							assets={selectedStocks}
							onItemsConfirm={handleItemsConfirm}
							onStockSelect={handleStockSelect}
						/>
					)}
				</Box>
				<Box width="60%">
					{showConditionSetting && (
						<ConditionSetting assets={selectedStocks} />
					)}
				</Box>
			</Box>
			{!hasPortfolio && (
				<AssetInputModal
					open={isModalOpen}
					handleClose={handleModalClose}
				/>
			)}

			<SuccessSnackbar
				message="담은 종목에 추가하였습니다"
				openSnackbar={openAddSnackbar}
				handleSnackbarClose={handleAddSnackbarClose}
			/>
			<SuccessSnackbar
				message="담은 종목에서 제거하였습니다"
				openSnackbar={openRemoveSnackbar}
				handleSnackbarClose={handleRemoveSnackbarClose}
			/>
		</Stack>
	);
};

export default PortfolioCreatePage;
