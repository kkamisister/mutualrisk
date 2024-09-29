import React from 'react';
import { Box, TextField, Typography, Chip } from '@mui/material';
import BasicButton from 'components/button/BasicButton';

const AssetConstraintList = ({ assets }) => {
	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					mb: 2,
					gap: 2,
				}}>
				<Chip sx={{ flex: 1 }} label="종목 이름" />
				<Chip sx={{ flex: 1 }} label="최솟값 (%)" />
				<Chip sx={{ flex: 1 }} label="최댓값 (%)" />
				<Chip sx={{ flex: 1 }} label="지정 비율 (%)" />
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
			<BasicButton text="포트폴리오 제작하기" sx={{ mt: 'auto' }} />
		</Box>
	);
};

export default AssetConstraintList;
