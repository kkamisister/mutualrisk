import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import BoxTitle from 'components/title/BoxTitle';
import StockSearch from 'pages/portfolio/create/stocksearch/StockSearch';
import ConditionSetting from 'pages/portfolio/create/condition/ConditionSetting';
import { colors } from 'constants/colors';
import SelectedList from 'pages/portfolio/create/selectedstock/SelectedList';
import AssetInputModal from 'pages/portfolio/create/AssetInputModal';
import useAssetStore from 'stores/useAsssetStore';

const PortfolioCreatePage = () => {
	const [showSelectedItems, setShowSelectedItems] = useState(false);
	const [showConditionSetting, setShowConditionSetting] = useState(false);
	const [selectedStocks, setSelectedStocks] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const userAssets = useAssetStore(state => state.assets);

	useEffect(() => {
		if (userAssets.length === 0) {
			setIsModalOpen(true);
		}
	}, [userAssets]);

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

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleEditAssets = () => {
		setIsModalOpen(true); // "수정하기" 버튼 클릭 시 모달 열기
	};

	return (
		<Box
			sx={{
				maxHeight: '100vh',
				overflowY: 'auto',
				pointerEvents: isModalOpen ? 'none' : 'auto', // 모달 열렸을 때 다른 요소 비활성화
			}}>
			<BoxTitle title="포트폴리오 제작" />
			{/* 자산 정보 박스 */}
			{userAssets.length > 0 && (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						position: 'relative',
						padding: '14px 20px',
						backgroundColor: colors.background.box,
						borderRadius: '20px',
						minWidth: '900px',
						width: 'calc(100% - 40px)',
						gap: '10px',
						marginBottom: '20px',
					}}>
					<Typography
						sx={{
							fontWeight: 'bold',
							color: colors.text.main,
						}}>
						현재 자산: {userAssets[0].value.toLocaleString()} 원
					</Typography>
					<Button variant="outlined" onClick={handleEditAssets}>
						수정하기
					</Button>
				</Box>
			)}
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
							onItemsConfirm={handleItemsConfirm}
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
			{isModalOpen && (
				<AssetInputModal
					open={isModalOpen}
					handleClose={handleModalClose}
				/>
			)}
		</Box>
	);
};

export default PortfolioCreatePage;
