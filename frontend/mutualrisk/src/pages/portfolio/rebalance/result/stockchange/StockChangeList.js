import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import StockChangeListItem from './StockChangeListItem'; // StockChangeListItem 컴포넌트 불러오기
import WidgetContainer from 'components/container/WidgetConatiner';
import Title from 'components/title/Title';

const StockChangeList = ({ stocks }) => {
	return (
		<WidgetContainer>
			<Title text={'종목별 보유량 변화'} />
			{/* 주식 목록 */}
			{stocks.map((stock, index) => (
				<StockChangeListItem key={index} stock={stock} />
			))}
		</WidgetContainer>
	);
};

export default StockChangeList;
