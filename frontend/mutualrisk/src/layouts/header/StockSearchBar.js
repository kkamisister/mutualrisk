import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Avatar, Box, TextField, Stack } from '@mui/material';
import { colors } from 'constants/colors';
import { useQuery } from '@tanstack/react-query';
import { fetchAssetsByKeyword } from 'utils/apis/asset';
import { useNavigate } from 'react-router-dom';

const StockSearchBar = () => {
	const [keyword, setKeyword] = useState('');
	const navigate = useNavigate();

	// Use react-query to fetch search results based on the keyword
	const { isLoading, data: searchResult = [] } = useQuery({
		queryKey: ['stockSearchResult', keyword],
		queryFn: () => fetchAssetsByKeyword(keyword),
		enabled: !!keyword,
	});

	// Function to handle Enter key to navigate to the first result
	const handleEnterKey = event => {
		console.log(event);
		if (searchResult.length === 0) {
			return;
		}
		if (event.key === 'Enter' && searchResult.length > 0) {
			// Set the TextField value to the first result's name
			setKeyword(searchResult[0].name);
			// Navigate to the detail page of the first result
			navigate(`/stock/detail/${searchResult[0].assetId}`);
		}
	};

	return (
		<Box
			sx={{
				minWidth: '330px',
				display: 'flex',
				bgcolor: colors.background.white,
				borderRadius: '100px',
				px: '10px',
				mx: '10px',
			}}>
			<SearchIcon
				sx={{
					alignSelf: 'center',
				}}
			/>
			<Autocomplete
				freeSolo
				sx={{ zIndex: 4 }}
				options={searchResult}
				autoHighlight
				inputValue={keyword} // This binds the input value to keyword state
				onInputChange={(event, newValue) => {
					setKeyword(newValue); // Update keyword when input changes
				}}
				getOptionLabel={option => {
					return option.name ? option.name : option;
				}}
				renderOption={(props, option) => (
					<Stack
						{...props}
						direction="row"
						spacing={1}
						sx={{
							alignItems: 'center',
							padding: '10px 10px 10px 10px',
							margin: '0 10px 0 10px',
							borderRadius: '10px',
							cursor: 'pointer',
							'&:hover': {
								backgroundColor: colors.background.box,
							},
						}}
						onClick={() => {
							navigate(`/stock/detail/${option.assetId}`);
						}}>
						<Avatar
							sx={{ width: 36, height: 36 }}
							alt={option.name}
							src={`https://j11a607.p.ssafy.io/stockImage/${option.code}.png`}
						/>
						<Box sx={{ fontWeight: 'bold', fontSize: '14px' }}>
							{option.name}
						</Box>
						<Box
							sx={{
								color: colors.text.sub2,
								fontSize: '14px',
							}}>{`${option.code}(${option.market})`}</Box>
					</Stack>
				)}
				renderInput={params => (
					<TextField
						{...params}
						placeholder="어떤 종목을 찾으세요?"
						onKeyDown={handleEnterKey} // Handle Enter key
						sx={{
							'& .MuiOutlinedInput-root': {
								height: '40px', // 높이 변경
								'& fieldset': {
									border: 'none', // 기본 외곽선 없앰
								},
								'&:hover fieldset': {
									border: 'none', // hover 시 외곽선 없앰
								},
							},
						}}
					/>
				)}
				fullWidth
			/>
		</Box>
	);
};

export default StockSearchBar;
