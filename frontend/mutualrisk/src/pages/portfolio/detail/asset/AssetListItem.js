import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { colors } from 'constants/colors';
import StockItemCard from 'components/card/StockItemCard';

const AssetListItem = ({ asset, highlight }) => {
	return (
		<Stack
			direction="row"
			sx={{
				width: highlight ? '520px' : '500px',
				height: highlight ? '80px' : 'none',
				maxWidth: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'stretch',
				marginBottom: '9px',
				// border: highlight ? `2px solid ${colors.main.primary500}` : 'none', // highlight 여부에 따른 테두리
				borderRadius: '10px',
				// backgroundColor: highlight ? colors.main.primary200 : 'transparent', // 강조된 항목의 배경색
				transition: 'background-color 0.3s ease, border 0.3s ease', // 부드러운 스타일 전환
			}}>
			{/* StockItemCard 컴포넌트에 API 데이터를 전달 */}
			<StockItemCard
				code={asset.code}
				name={asset.name}
				market={asset.market}
				image={`https://j11a607.p.ssafy.io/stockImage/${asset.code}.png`}
				sx={{
					backgroundColor: highlight
						? colors.background.box
						: colors.background.primary,
				}}>
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
							color: asset.dailyPriceChange > 0 ? 'red' : 'blue',
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
					backgroundColor: highlight
						? colors.main.primary400
						: colors.main.primary200,
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
