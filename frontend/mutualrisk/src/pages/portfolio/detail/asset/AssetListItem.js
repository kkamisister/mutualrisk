import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const AssetListItem = ({ asset }) => {
	return (
		<Box
			sx={{
				// width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				backgroundColor: '#E9EBEF',
				borderRadius: '20px',
				padding: '15px',
				marginBottom: '15px',
				boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
			}}>
			{/* 좌측 아이콘 및 정보 */}
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Avatar
					src={asset.imagePath}
					alt={asset.name}
					sx={{ width: '50px', height: '50px', marginRight: '10px' }}
				/>
				<Box>
					<Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
						{asset.name}
					</Typography>
					<Typography sx={{ fontSize: '14px', color: '#9E9E9E' }}>
						{asset.ticker}({asset.market})
					</Typography>
				</Box>
			</Box>

			{/* 중간 금액 정보 */}
			<Box sx={{ textAlign: 'right', marginRight: '20px' }}>
				<Typography
					sx={{ color: 'red', fontWeight: 'bold', fontSize: '14px' }}>
					+{asset.changeAmount}원 ({asset.changeRate}%)
				</Typography>
				<Typography sx={{ fontSize: '14px', color: '#9E9E9E' }}>
					{asset.currentPrice}원
				</Typography>
			</Box>

			{/* 우측 비율 */}
			<Box
				sx={{
					backgroundColor: '#101C4E',
					borderRadius: '12px',
					color: '#FFFFFF',
					padding: '10px 20px',
					minWidth: '60px',
					textAlign: 'center',
					fontSize: '16px',
					fontWeight: 'bold',
				}}>
				{asset.ratio}%
			</Box>
		</Box>
	);
};

export default AssetListItem;
