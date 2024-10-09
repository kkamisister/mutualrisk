import React, { useEffect, useState } from 'react';
import { Box, Stack, Grid } from '@mui/material';
import BoxTitle from 'components/title/BoxTitle';
import StockSearch from 'pages/portfolio/create/stocksearch/StockSearch';
import ConditionSetting from 'pages/portfolio/create/condition/ConditionSetting';
import SelectedList from 'pages/portfolio/create/selectedstock/SelectedList';
import AssetInputModal from 'pages/portfolio/create/AssetInputModal';
import {
	fetchPortfolioList,
	fetchPortfolioByPorfolioId,
} from 'utils/apis/analyze';
import useAssetStore from 'stores/useAssetStore';
import { useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { colors } from 'constants/colors';

const PortfolioCreatePage = () => {
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [hasPortfolio, setHasPortfolio] = useState(true);
	const [latestPortfolioId, setLatestPortfolioId] = useState('');
	const [showContraint, setShowConstraint] = useState(false);

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

	const onItemsConfirm = () => {
		setShowConstraint(true);
	};

	useEffect(() => {
		if (portfolioList.length > 0) {
			updateTotalCash(portfolioList.recentValuation);
			setLatestPortfolioId(portfolioList.portfolioList[0].id);
		}
	}, [portfolioList]);

	const { data: latestPortfolio } = useQuery({
		queryKey: ['portfolioDetail', latestPortfolioId],
		queryFn: () => {
			return fetchPortfolioByPorfolioId(latestPortfolioId);
		},
		enabled: !!latestPortfolioId,
	});

	useEffect(() => {
		if (latestPortfolio && latestPortfolio.portfolio) {
			updateAsset(latestPortfolio.portfolio.assets);
		}
	}, [latestPortfolio]);

	const handleModalClose = () => {
		setIsModalOpen(false);
	};
	useEffect(() => {
		console.log('assets', assets);
	}, [assets]);
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
								maxHeight: '45%',
							}}
						/>
						{assets && (
							<SelectedList
								onItemsConfirm={onItemsConfirm}
								assets={assets}
								sx={{ height: '45%' }}
							/>
						)}
					</Stack>
				</Grid>

				<Grid item xs={7} sx={{ height: '100%', maxHeight: '800px' }}>
					{(showContraint || hasPortfolio) && (
						<ConditionSetting assets={assets} />
					)}
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
