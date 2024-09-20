import SearchIcon from '@mui/icons-material/Search';
import { TextField, Box } from '@mui/material';
import { colors } from 'constants/colors';
import { useState } from 'react';

const StockSearchBar = () => {
	const stockSearch = stockName => {
		// 검색용 함수
	};
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				bgcolor: colors.background.box,
				borderRadius: '16px',
				paddingX: '20px',
			}}>
			<SearchIcon
				sx={{
					alignSelf: 'center',
				}}
			/>
			<TextField
				placeholder="종목 이름 또는 종목 코드를 입력하세요"
				onChange={event => {
					stockSearch(event.target.value);
				}}
				fullWidth
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
		</Box>
	);
};

export default StockSearchBar;
