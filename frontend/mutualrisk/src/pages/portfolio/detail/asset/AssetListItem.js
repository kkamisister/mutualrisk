import React from 'react';
import { Box, Typography, Avatar, Stack } from '@mui/material';
import { colors } from 'constants/colors';

const AssetListItem = ({ asset }) => {
	return (
		<Stack
			direction="row"
			sx={{
				width: '500px',
				maxWidth: '100%',
				display: 'flex',
				justifyContent: 'space-evenly',
				alignItems: 'center',
				marginBottom: '9px',
			}}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: colors.background.box,
					borderRadius: '20px',
					padding: '10px',
					marginRight: '8px',
					flex: 1, // 부모 높이를 차지하게 설정
					height: '50px',
					minHeight: '0', // 부모 높이에 따라 높이 제한
				}}>
				{/* 좌측 아이콘 및 정보 */}
				<Box
					sx={{
						display: 'flex',
					}}>
					<Avatar
						src={asset.imagePath}
						alt={asset.name}
						sx={{ width: '40px', height: '40px', marginRight: '15px' }}
					/>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-evenly',
						}}>
						<Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
							{asset.name}
						</Typography>
						<Typography
							sx={{ fontSize: '13px', color: colors.text.sub2 }}>
							{asset.ticker}({asset.market})
						</Typography>
					</Box>
				</Box>
				{/* 중간 금액 정보 */}
				<Box
					sx={{
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-evenly',
						textAlign: 'right',
						// marginRight: '20px',
					}}>
					<Typography
						sx={{ color: 'red', fontWeight: 'bold', fontSize: '16px' }}>
						+{asset.changeAmount}원 ({asset.changeRate}%)
					</Typography>
					<Typography sx={{ fontSize: '13px', color: colors.text.sub2 }}>
						{asset.currentPrice}원
					</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					backgroundColor: '#73748B',
					borderRadius: '20px',
					color: '#FFFFFF',
					padding: '10px',
					minWidth: '60px',
					textAlign: 'center',
					fontSize: '20px',
					fontWeight: 'bold',
					height: '50px',
					minHeight: '0', // 부모 높이에 따라 높이 제한
					maxWidth: '30%',
					alignContent: 'center',
				}}>
				{asset.ratio}%
			</Box>
		</Stack>
	);
};

export default AssetListItem;
