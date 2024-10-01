import React, { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import StockList from 'pages/portfolio/create/stocksearch/StockList';
import BasicButton from 'components/button/BasicButton';
import { colors } from 'constants/colors';
import StockSearchBar from './StockSearchBar';
import Title from 'components/title/Title';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import useStockSearch from 'hooks/useStockSearch';

const SearchStatusBox = ({ Icon, text }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				color: colors.text.sub1,
				p: 4,
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

const StockSearch = ({ onConfirm, selectedStocks, onStockSelect, sx }) => {
	const [tempStocks, setTempStocks] = useState([]);
	const { keyword, setKeyword, isLoading, searchResult } = useStockSearch();

	const handleTempStocks = stock => {
		if (tempStocks.find(selected => selected.assetId === stock.assetId)) {
			setTempStocks(
				tempStocks.filter(selected => selected.assetId !== stock.assetId)
			);
		} else {
			setTempStocks([...tempStocks, stock]);
		}
	};

	const confirmSelectedStocks = () => {
		const newStocks = tempStocks.filter(
			stock =>
				!selectedStocks.some(selected => selected.assetId === stock.assetId)
		);
		onConfirm([...selectedStocks, ...newStocks]);
	};
	return (
		<Box
			sc={{
				...sx,
			}}>
			<Title text="종목 검색" />
			<Box
				sx={{
					bgcolor: colors.background.white,
					borderRadius: '16px',
					border: `solid 1px ${colors.point.stroke}`,
					p: 2,
				}}>
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
					<StockList
						assets={searchResult}
						selectedStocks={tempStocks}
						onStockSelect={handleTempStocks}
					/>
				)}

				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<BasicButton text="추가" onClick={confirmSelectedStocks} />
				</Box>
			</Box>
		</Box>
	);
};

export default StockSearch;
