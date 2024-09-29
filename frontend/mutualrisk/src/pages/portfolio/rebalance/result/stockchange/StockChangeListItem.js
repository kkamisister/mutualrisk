import React from 'react';
import { Box, Typography, Avatar, Stack } from '@mui/material';
import { colors } from 'constants/colors'; // 컬러 상수 불러오기

const StockChangeListItem = ({ stock }) => {
	return (
		<Stack
			direction={'row'}
			spacing={1}
			sx={{
				height: '50px',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: '15px',
			}}>
			{/* 좌측 주식 정보 */}
			<Stack
				direction="row"
				alignItems="center"
				sx={{
					height: '100%',
					backgroundColor: colors.background.box,
					borderRadius: '20px',
					padding: '10px',
				}}>
				<Avatar
					src={stock.imagePath}
					alt={stock.name}
					sx={{ width: 50, height: 50, marginRight: '10px' }}
				/>
				<Stack>
					<Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
						{stock.name}
					</Typography>
					<Typography sx={{ fontSize: '14px', color: colors.text.sub2 }}>
						{stock.ticker}
					</Typography>
				</Stack>
			</Stack>

			{/* 기존 주식 가격 및 수량 */}
			<Stack
				direction="row"
				alignItems="center"
				sx={{
					height: '100%',
					backgroundColor: colors.background.box,
					borderRadius: '20px',
					padding: '10px',
				}}>
				<Typography
					sx={{
						fontSize: '16px',
						color: colors.text.sub1,
						marginRight: '5px',
					}}>
					{stock.currentPrice}원
				</Typography>
				<Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
					{stock.currentShares}주
				</Typography>
			</Stack>

			{/* 리밸런싱 후 가격 및 수량 */}
			<Stack
				direction="row"
				alignItems="center"
				sx={{
					height: '100%',
					backgroundColor: colors.background.box,
					borderRadius: '20px',
					padding: '10px',
				}}>
				<Typography
					sx={{
						fontSize: '16px',
						color: colors.text.sub1,
						marginRight: '5px',
					}}>
					{stock.rebalancedPrice}원
				</Typography>
				<Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
					{stock.rebalancedShares}주
				</Typography>
			</Stack>

			{/* 보유량 변화 */}
			<Box
				direction="row"
				alignItems="center"
				sx={{
					height: '100%',
					backgroundColor: '#B6B5D0',
					borderRadius: '20px',
					padding: '10px',
				}}>
				<Typography
					sx={{
						fontSize: '16px',
						color: colors.text.sub1,
						marginRight: '5px',
					}}>
					{stock.rebalancedPrice}원{' '}
				</Typography>
				<Typography
					sx={{
						color: stock.change > 0 ? 'red' : colors.text.sub1,
						colorfontSize: '16px',
						fontWeight: 'bold',
					}}>
					{stock.change > 0 ? `+${stock.change}주` : `-${stock.change}주`}
				</Typography>
			</Box>
		</Stack>
	);
};

export default StockChangeListItem;
