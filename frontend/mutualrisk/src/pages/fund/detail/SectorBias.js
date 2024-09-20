import React from 'react';
import { Stack, LinearProgress, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import SubTitle from 'components/title/SubTitle';

const sampleData = [
	{ rank: 1, title: '기술 하드웨어, 스토리지 및 주변 기기', value: 31.5 },
	{ rank: 1, title: '기술 하드웨어, 스토리지 및 주변 기기', value: 31.5 },
	{ rank: 1, title: '기술 하드웨어, 스토리지 및 주변 기기', value: 31.5 },
	{ rank: 1, title: '기술 하드웨어, 스토리지 및 주변 기기', value: 31.5 },
	{ rank: 1, title: '기술 하드웨어, 스토리지 및 주변 기기', value: 31.5 },
	{ rank: 1, title: '기술 하드웨어, 스토리지 및 주변 기기', value: 31.5 },
	{ rank: 1, title: '기술 하드웨어, 스토리지 및 주변 기기', value: 31.5 },
	{ rank: 1, title: '기술 하드웨어, 스토리지 및 주변 기기', value: 31.5 },
	{ rank: 1, title: '기술 하드웨어, 스토리지 및 주변 기기', value: 31.5 },
	{ rank: 1, title: '기술 하드웨어, 스토리지 및 주변 기기', value: 31.5 },
	{ rank: 1, title: '기술 하드웨어, 스토리지 및 주변 기기', value: 31.5 },
];

const DataBox = ({ rank, title, value }) => {
	return (
		<Stack
			direction="row"
			spacing={2}
			sx={{
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<Typography sx={{ fontSize: '20px' }}>{rank}</Typography>
			<Stack direction="column" sx={{ width: '100%' }}>
				<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
					<Typography color={colors.text.main}>{title}</Typography>
					<Typography color={colors.text.sub2}>({value})%</Typography>
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
				{sampleData.map(sector => (
					<DataBox
						rank={sector.rank}
						title={sector.title}
						value={sector.value}
					/>
				))}
			</Stack>
		</Stack>
	);
};

export default SectorBias;
