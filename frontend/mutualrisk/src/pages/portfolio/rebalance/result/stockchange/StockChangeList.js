import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import StockChangeListItem from './StockChangeListItem'; // StockChangeListItem 컴포넌트 불러오기
import WidgetContainer from 'components/container/WidgetConatiner';
import Title from 'components/title/Title';

const StockChangeList = ({ rebalanceData }) => {
	const changeAssets =
		rebalanceData?.data?.changeAssetInfoList?.map(asset => ({
			code: asset.assetId,
			name: asset.name,
			market: asset.market,
			currentPrice: asset.price, // 현재 주식 가격
			currentShares: asset.oldPurchaseNum, // 기존 주식 보유량
			rebalancedPrice: asset.price, // 리밸런싱 후 주식 가격
			rebalancedShares: asset.newPurchaseNum, // 리밸런싱 후 보유량
			change: asset.newPurchaseNum - asset.oldPurchaseNum, // 보유량 변화
			imageURL: `https://j11a607.p.ssafy.io/stockImage/${asset.code}.png`,
		})) || [];

	return (
		<WidgetContainer>
			<Title text={'종목별 보유량 변화'} />
			{/* 주식 목록 */}
			{changeAssets.map((stock, index) => (
				<StockChangeListItem key={index} stock={stock} />
			))}
		</WidgetContainer>
	);
};

export default StockChangeList;
