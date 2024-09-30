import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import BasicButton from 'components/button/BasicButton';
import BasicChip from 'components/chip/BasicChip';

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
				<BasicChip label="종목 이름" /> {/* label 커스텀 */}
				<BasicChip label="최솟값 (%)" />
				<BasicChip label="최댓값 (%)" />
				<BasicChip label="지정 비율 (%)" />
			</Box>

			{/* 종목별 입력란 */}
			{assets.map(asset => (
				<Box
					key={asset.assetId}
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						mb: 2,
						flexWrap: 'nowrap',
					}}>
					{/* 종목 이름 */}
					<Box
						sx={{
							flex: 1,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
							{asset.name}
						</Typography>
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
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}>
				<BasicButton text="포트폴리오 제작하기" sx={{ mt: 'auto' }} />
			</Box>
		</Box>
	);
};

export default AssetConstraintList;
