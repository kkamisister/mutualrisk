import { useRef, useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Stack } from '@mui/material';
import StockList from 'pages/portfolio/create/stocksearch/StockList';
import BasicButton from 'components/button/BasicButton';
import { colors } from 'constants/colors';
import StockSearchBar from './StockSearchBar';
import Title from 'components/title/Title';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import useStockSearch from 'hooks/useStockSearch';
import useAssetStore from 'stores/useAssetStore';
import { enqueueSnackbar } from 'notistack';

const SearchStatusBox = ({ Icon, text }) => {
	return (
		<Box
			sx={{
				color: colors.text.sub1,
				p: 2,
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
			}}>
			<Icon sx={{ fontSize: '100px' }} />
			<Typography
				sx={{
					fontWeight: 'bold',
					fontSize: '16px',
				}}>
				{text}
			</Typography>
		</Box>
	);
};

const StockSearch = ({ sx }) => {
	const { keyword, setKeyword, isLoading, searchResult } = useStockSearch();
	const { tempAssets, addAssetList, assets } = useAssetStore(state => ({
		tempAssets: state.tempAssets,
		addAssetList: state.addAssetList,
		assets: state.assets,
	}));

	const addTempToAssets = () => {
		const tempArray = Array.from(tempAssets);
		addAssetList(tempArray);
	};

	return (
		<Stack
			spacing={1}
			sx={{
				bgcolor: colors.background.white,
				borderRadius: '16px',
				border: `solid 1px ${colors.point.stroke}`,
				p: 2,
				...sx,
			}}>
			<Title text="종목 검색" />
			<StockSearchBar onKeywordChange={setKeyword} />

			{!isLoading && keyword === '' && (
				<SearchStatusBox Icon={SearchIcon} text="종목을 검색하세요." />
			)}

			{isLoading && (
				<SearchStatusBox Icon={CircularProgress} text="로딩 중입니다." />
			)}

			{!isLoading && keyword && searchResult.length === 0 && (
				<SearchStatusBox
					Icon={CloseIcon}
					text="검색 결과가 존재하지 않습니다."
				/>
			)}

			{!isLoading && searchResult.length > 0 && (
				<>
					<StockList assets={searchResult} />

					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<BasicButton text="추가" onClick={addTempToAssets} />
					</Box>
				</>
			)}
		</Stack>
	);
};

export default StockSearch;
