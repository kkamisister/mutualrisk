import React from 'react';
import { Box, Typography, Avatar, Stack } from '@mui/material';
import { colors } from 'constants/colors'; // 컬러 상수 불러오기
import StockItemCard from 'components/card/StockItemCard';

const StockChangeListItem = ({ stock }) => {
	return (
		<Stack
			direction={'row'}
			spacing={2}
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: '15px',
			}}>
			{/* 좌측 주식 정보 */}
			<StockItemCard
				code={stock.code}
				name={stock.name}
				market={stock.market}
				image={stock.imageURL}
				sx={{
					height: '60px',
					minWidth: '300px',
					maxWidth: '350px',
				}}
			/>

			{/* 기존 주식 가격 및 수량 */}
			<Stack
				direction="column"
				sx={{
					flex: 1,
					height: '60px',
					minWidth: '150px',
					justifyContent: 'center',
					backgroundColor: colors.background.white,
					border: 'solid 2px',
					borderColor: colors.background.box,
					borderRadius: '10px',
					padding: '10px',
				}}>
				<Typography fontSize={10}>기존 주 수</Typography>
				<Stack direction="row" alignItems="center" justifyContent="center">
					<Typography
						sx={{
							fontSize: '16px',
							color: colors.text.sub2,
							fontWeight: 'bold',
							marginRight: '10px',
						}}>
						{stock.currentPrice.toLocaleString()}원
					</Typography>
					<Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
						{stock.currentShares.toLocaleString()}주
					</Typography>
				</Stack>
			</Stack>

			{/* 리밸런싱 후 가격 및 수량 */}
			<Stack
				direction="column"
				sx={{
					flex: 1,
					height: '60px',
					minWidth: '150px',
					justifyContent: 'center',
					backgroundColor: colors.background.white,
					border: 'solid 2px',
					borderColor: colors.background.box,
					borderRadius: '10px',
					padding: '10px',
				}}>
				<Typography fontSize={10}>리밸런싱 주 수</Typography>
				<Stack direction="row" alignItems="center" justifyContent="center">
					<Typography
						sx={{
							fontSize: '16px',
							color: colors.text.sub2,
							fontWeight: 'bold',
							marginRight: '10px',
						}}>
						{stock.rebalancedPrice.toLocaleString()}원
					</Typography>
					<Typography
						sx={{
							fontSize: '20px',
							fontWeight: 'bold',
							color: colors.main.primary400,
						}}>
						{stock.rebalancedShares.toLocaleString()}주
					</Typography>
				</Stack>
			</Stack>

			{/* 보유량 변화 */}
			<Box
				sx={{
					flex: 1,
					height: '60px',
					minWidth: '150px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: colors.main.primary200,
					borderRadius: '10px',
					padding: '10px',
				}}>
				<Typography
					sx={{
						fontSize: '18px',
						fontWeight: 'bold',
						color: colors.text.sub1,
						marginRight: '10px',
					}}>
					{stock.rebalancedPrice.toLocaleString()}원
				</Typography>
				<Typography
					sx={{
						color:
							stock.change > 0
								? colors.point.red
								: stock.change < 0
								? colors.main.primary500
								: 'gray', // 0이면 회색
						fontSize: '20px',
						fontWeight: 'bold',
					}}>
					{stock.change > 0
						? `+ ${stock.change.toLocaleString()}주`
						: stock.change < 0
						? `- ${Math.abs(stock.change).toLocaleString()}주`
						: `${stock.change.toLocaleString()}주`}{' '}
					{/* 0이면 부호 없이 표시 */}
				</Typography>
			</Box>
		</Stack>
	);
};

export default StockChangeListItem;
