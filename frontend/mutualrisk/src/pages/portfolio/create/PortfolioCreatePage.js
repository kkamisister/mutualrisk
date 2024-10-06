import React, { useEffect, useState } from 'react';
import { Box, Stack, Grid } from '@mui/material';
import BoxTitle from 'components/title/BoxTitle';
import StockSearch from 'pages/portfolio/create/stocksearch/StockSearch';
import ConditionSetting from 'pages/portfolio/create/condition/ConditionSetting';
import SelectedList from 'pages/portfolio/create/selectedstock/SelectedList';
import AssetInputModal from 'pages/portfolio/create/AssetInputModal';
import SuccessSnackbar from 'components/snackbar/SuccessSnackbar';
import { fetchPortfolioList } from 'utils/apis/analyze';
import { useQuery } from '@tanstack/react-query';

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
		<Stack spacing={1} sx={{ height: '100vh' }}>
			<BoxTitle title="포트폴리오 제작" />
			<Grid
				container
				justifyContent={'space-between'}
				sx={{ height: '90vh', overflowY: 'hidden' }}>
				<Grid item xs={4.8} sx={{ height: '100%' }}>
					<Stack spacing={2} height="100%" alignContent={'space-between'}>
						<Box height="50%">
							<StockSearch
								onConfirm={handleSearchConfirm}
								selectedStocks={selectedStocks}
								onStockSelect={handleStockSelect}
							/>
						</Box>
						<Box height="50%">
							{showSelectedItems && (
								<SelectedList
									assets={selectedStocks}
									onItemsConfirm={handleItemsConfirm}
									onStockSelect={handleStockSelect}
									sx={{ height: '100%' }}
								/>
							)}
						</Box>
					</Stack>
				</Grid>

				<Grid item xs={7} sx={{ height: '100%', maxHeight: '800px' }}>
					<Box sx={{ height: '100%' }}>
						{showConditionSetting && (
							<ConditionSetting assets={selectedStocks} />
						)}
					</Box>
				</Grid>
			</Grid>
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
