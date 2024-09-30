import React from 'react';
import { Stack } from '@mui/material';
import AssetRatioPieChart from 'pages/portfolio/detail/asset/AssetRatioPieChart';
import AssetList from 'pages/portfolio/detail/asset/AssetList';
import { colors } from 'constants/colors';
import Title from 'components/title/Title';

const AssetRatio = () => {
	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '20px',
				borderRadius: '20px',
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			<Title text={'보유 자산 비율'} />
			<Stack
				spacing={2}
				direction="row"
				sx={{
					width: '100%',
					height: '100%',
					maxHeight: '100%',
					display: 'flex',
					justifyContent: 'space-evenly',
					alignItems: 'center',
					flexWrap: 'nowrap',
				}}>
				<AssetRatioPieChart sx={{ flex: 1 }} />
				<AssetList sx={{ flex: 1 }} />
			</Stack>
		</Stack>
	);
};

export default AssetRatio;
