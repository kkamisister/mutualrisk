import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Box, TextField } from '@mui/material';
import { colors } from 'constants/colors';
import { useQuery } from '@tanstack/react-query';
import { fetchAssetsByKeyword } from 'utils/apis/asset';
import { useNavigate } from 'react-router-dom';

const StockSearchBar = () => {
	const [keyword, setKeyword] = useState('');
	const navigate = useNavigate();

	const { isLoading, data: searchResult = [] } = useQuery({
		queryKey: ['stockSearchResult', keyword], // keyword를 queryKey에 포함하여 키워드가 변경되면 새로운 요청 실행
		queryFn: () => fetchAssetsByKeyword(keyword),
		enabled: !!keyword, // 키워드가 있을 때만 요청 실행
	});
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
				options={searchResult}
				getOptionLabel={option => {
					return option.name;
				}} // label을 사용하도록 정의
				renderInput={params => (
					<TextField
						placeholder="어떤 종목을 찾으세요?"
						onChange={event => {
							setKeyword(event.target.value);
						}}
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
						{...params}
					/>
				)}
				fullWidth
			/>
		</Box>
	);
};

export default StockSearchBar;
