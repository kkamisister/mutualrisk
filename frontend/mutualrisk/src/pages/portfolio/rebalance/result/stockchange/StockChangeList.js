import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import StockChangeListItem from './StockChangeListItem'; // StockChangeListItem 컴포넌트 불러오기

const StockChangeList = ({ stocks }) => {
	return (
		<Box>
			{/* 테이블 헤더 */}
			<Stack
				direction="row"
				justifyContent="end"
				sx={{ marginBottom: '10px' }}>
				<Stack
					direction="row"
					justifyContent="space-between"
					sx={{ width: '80%' }}>
					<Typography>기존 종목별 주 수</Typography>
					<Typography>리밸런싱 종목별 주 수</Typography>
					<Typography>보유량 변화</Typography>
				</Stack>
			</Stack>

			{/* 주식 목록 */}
			{stocks.map((stock, index) => (
				<StockChangeListItem key={index} stock={stock} />
			))}
		</Box>
	);
};

export default StockChangeList;
