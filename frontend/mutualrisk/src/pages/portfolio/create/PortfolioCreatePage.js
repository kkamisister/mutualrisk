import React, { useEffect, useState } from 'react';
import { Box, Stack, Grid } from '@mui/material';
import BoxTitle from 'components/title/BoxTitle';
import StockSearch from 'pages/portfolio/create/stocksearch/StockSearch';
import ConditionSetting from 'pages/portfolio/create/condition/ConditionSetting';
import SelectedList from 'pages/portfolio/create/selectedstock/SelectedList';
import AssetInputModal from 'pages/portfolio/create/AssetInputModal';
import { fetchPortfolioList } from 'utils/apis/analyze';
import useAssetStore from 'stores/useAssetStore';
import { useQuery } from '@tanstack/react-query';
import { fetchPortfolioByPorfolioId } from 'utils/apis/analyze';
import { enqueueSnackbar } from 'notistack';
import { colors } from 'constants/colors';

const PortfolioCreatePage = () => {
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [hasPortfolio, setHasPortfolio] = useState(true);
	const [latestPortfolioId, setLatestPortfolioId] = useState('');
	const [previousAssets, setPreviousAssets] = useState([]);

	const { assets, updateAsset, updateTotalCash } = useAssetStore(state => ({
		assets: state.assets,
		updateAsset: state.updateAsset,
		updateTotalCash: state.updateTotalCash,
	}));

	const { data: portfolioList } = useQuery({
		queryKey: ['portfolioList'],
		queryFn: fetchPortfolioList,
		onSuccess: data => {
			setHasPortfolio(data.hasPortfolio);
		},
	});

	useEffect(() => {
		if (portfolioList) {
			updateTotalCash(portfolioList.recentValuation);
			setLatestPortfolioId(portfolioList.portfolioList.id);
		}
	}, [portfolioList, updateTotalCash]);

	const { data: latestPortfolio } = useQuery({
		queryKey: ['portfolioDetail', latestPortfolioId],
		queryFn: () => fetchPortfolioByPorfolioId(latestPortfolioId),
		enabled: !!latestPortfolioId,
		onSuccess: data => {
			updateAsset(data.portfolio.assets);
		},
	});

	useEffect(() => {
		if (previousAssets.length > 0) {
			const addedAssets = assets.filter(
				asset => !previousAssets.includes(asset)
			);
			const removedAssets = previousAssets.filter(
				asset => !assets.includes(asset)
			);

			addedAssets.forEach(asset =>
				enqueueSnackbar(`${asset.name} 종목이 추가되었습니다.`, {
					variant: 'success',
				})
			);
			removedAssets.forEach(asset =>
				enqueueSnackbar(`${asset.name} 종목이 제거되었습니다.`, {
					variant: 'warning',
				})
			);
		}
		setPreviousAssets(assets);
	}, [assets, previousAssets]);

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	return (
		<Stack spacing={1} sx={{ height: '100vh' }}>
			<BoxTitle title="포트폴리오 제작" />
			<Grid
				container
				spacing={2}
				sx={{ height: '90vh', overflowY: 'hidden' }}>
				<Grid item xs={4.8} sx={{ height: '100%' }}>
					<Stack spacing={2} height="100%">
						<StockSearch
							sx={{
								minHeight: '45%',
							}}
						/>
						{assets && (
							<SelectedList assets={assets} sx={{ height: '45%' }} />
						)}
					</Stack>
				</Grid>

				<Grid item xs={7} sx={{ height: '100%', maxHeight: '800px' }}>
					{assets.length > 0 && <ConditionSetting assets={assets} />}
				</Grid>
			</Grid>
			{!hasPortfolio && (
				<AssetInputModal
					open={isModalOpen}
					handleClose={handleModalClose}
				/>
			)}
		</Stack>
	);
};

export default PortfolioCreatePage;
