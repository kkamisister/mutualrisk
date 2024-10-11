import React from 'react';
import { Stack, LinearProgress, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import SubTitle from 'components/title/SubTitle';

const DataBox = ({ rank, title, value }) => {
	return (
		<Stack
			direction="row"
			spacing={2}
			sx={{
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<Typography sx={{ fontSize: '20px' }}>
				{String(rank).padStart(2, '0')}
			</Typography>
			<Stack direction="column" sx={{ width: '100%' }}>
				<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
					<Typography color={colors.text.main}>{title}</Typography>
					<Typography color={colors.text.sub2}>
						({value.toPrecision(2)}%)
					</Typography>
				</Stack>
				<LinearProgress
					sx={{
						height: '15px',
						borderRadius: '10px',
						backgroundColor: colors.main.primary100,
						'& .MuiLinearProgress-barColorPrimary': {
							backgroundColor: colors.main.primary400,
						},
					}}
					variant="determinate"
					value={value}
				/>
			</Stack>
		</Stack>
	);
};

const SectorBias = ({ title, data }) => {
	const sectors = data.sectors.sort((a, b) => b.weight - a.weight);
	return (
		<Stack
			spacing={2}
			sx={{
				backgroundColor: colors.background.white,
				padding: '15px',
				borderRadius: '10px',
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			<SubTitle text={title} />
			<Stack spacing={2}>
				{sectors.map((sector, idx) => (
					<DataBox
						rank={idx + 1}
						title={sector.name}
						value={sector.weight}
					/>
				))}
			</Stack>
		</Stack>
	);
};

export default SectorBias;
