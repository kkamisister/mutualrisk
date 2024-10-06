import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { colors } from 'constants/colors';
import StockItemCard from 'components/card/StockItemCard';

const AssetListItem = ({ asset }) => {
	return (
		<Stack
			direction="row"
			sx={{
				width: '500px',
				maxWidth: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'stretch',
				marginBottom: '9px',
			}}>
			{/* StockItemCard 컴포넌트에 API 데이터를 전달 */}
			<StockItemCard
				code={asset.code} // ticker 대신 code로 변경
				name={asset.name}
				market={asset.market}
				image={asset.imagePath}>
				<Box
					sx={{
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-evenly',
						textAlign: 'right',
					}}>
					<Typography
						sx={{
							color: asset.dailyPriceChange > 0 ? 'red' : 'blue', // 상승이면 빨간색, 하락이면 파란색
							fontWeight: 'bold',
							fontSize: '16px',
						}}>
						{/* 일일 가격 변화 표시 */}
						{asset.dailyPriceChange.toLocaleString()}원 (
						{asset.dailyPriceChangeRate}%)
					</Typography>
					{/* 현재 가격 표시 */}
					<Typography sx={{ fontSize: '13px', color: colors.text.sub2 }}>
						{asset.price.toLocaleString()}원
					</Typography>
				</Box>
			</StockItemCard>

			{/* 자산 비율 정보 */}
			<Box
				sx={{
					backgroundColor: colors.main.primary400,
					padding: '10px',
					borderRadius: '10px',
					color: '#FFFFFF',
					minWidth: '60px',
					textAlign: 'center',
					fontSize: '20px',
					fontWeight: 'bold',
					marginLeft: '9px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flex: 1,
				}}>
				{/* 비율은 100을 곱해 퍼센트로 표시 */}
				{(asset.weight * 100).toFixed(1)}%
			</Box>
		</Stack>
	);
};

export default AssetListItem;
