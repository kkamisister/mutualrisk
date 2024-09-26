import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const AssetConstraintList = ({ assets }) => {
	return (
		<Box>
			{/* 헤더 부분 */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					mb: 2,
				}}>
				<Typography sx={{ flex: 1 }}>종목 이름</Typography>
				<Typography sx={{ flex: 1 }}>최솟값 (%)</Typography>
				<Typography sx={{ flex: 1 }}>최댓값 (%)</Typography>
				<Typography sx={{ flex: 1 }}>지정 비율 (%)</Typography>
			</Box>

			{/* 종목별 입력란 */}
			{assets.map(asset => (
				<Box
					key={asset.assetId}
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						mb: 2,
						flexWrap: 'nowrap', // 한 줄에 유지되도록
					}}>
					{/* 종목 이름 */}
					<Box sx={{ flex: 1 }}>
						<Typography>{asset.name}</Typography>
					</Box>

					{/* 최솟값 입력란 */}
					<Box sx={{ flex: 1, mx: 1 }}>
						<TextField fullWidth label="최솟값" />
					</Box>

					{/* 최댓값 입력란 */}
					<Box sx={{ flex: 1, mx: 1 }}>
						<TextField fullWidth label="최댓값" />
					</Box>

					{/* 지정 비율 입력란 */}
					<Box sx={{ flex: 1, mx: 1 }}>
						<TextField fullWidth label="지정 비율" />
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default AssetConstraintList;
