import React, { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { colors } from 'constants/colors';
import SubTitle from 'components/title/SubTitle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Line,
	ResponsiveContainer,
	Legend,
} from 'recharts';

import { useQueryClient, useQuery } from '@tanstack/react-query';
import { fetchFundEvaluateFluctuateByCompany } from 'utils/apis/fund';

const AssetEvaluationChart = ({ title, company }) => {
	const [period, setPeriod] = useState(1);
	const queryClient = useQueryClient();

	useEffect(() => {
		console.log('Period:', period, 'Company:', company);
	}, [period, company]);

	const { isLoading, data } = useQuery({
		queryKey: ['fundEvaluateFluctuate', company, period],
		queryFn: async ({ queryKey }) => {
			const [, company, period] = queryKey;

			return (
				await fetchFundEvaluateFluctuateByCompany({ company, period })
			).map(history => ({
				...history,
				submissionDateString: `${history.submissionDate.year}/${history.submissionDate.quarter}`,
			}));
		},
	});

	const handleChange = (event, newPeriod) => {
		if (newPeriod !== null) {
			setPeriod(newPeriod);
			queryClient.invalidateQueries([
				'fundEvaluateFluctuate',
				company,
				newPeriod,
			]);
		}
	};

	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '15px',
				borderRadius: '10px',
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			<Stack
				direction="row"
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<SubTitle text={title} />

				<ToggleButtonGroup
					color="primary"
					value={period}
					exclusive
					size="small"
					onChange={handleChange}
					sx={{
						'& .MuiToggleButtonGroup-grouped': {
							borderRadius: '20px',
							width: '60px',
							border: '0px',
							transition:
								'background-color 0.3s ease, transform 0.3s ease',
							'&:hover': {
								backgroundColor: colors.main.primary100,
							},
							fontWeight: 'bold',
						},

						'& .Mui-selected': {
							backgroundColor: colors.main.primary200,
						},
						height: '30px',
						backgroundColor: colors.background.primary,
						borderRadius: '20px',
					}}>
					<ToggleButton value={1}>1년</ToggleButton>
					<ToggleButton value={3}>3년</ToggleButton>
					<ToggleButton value={5}>5년</ToggleButton>
				</ToggleButtonGroup>
			</Stack>

			<Box
				sx={{
					fontSize: '12px',
					height: '250px',
					width: '100%',
				}}>
				<ResponsiveContainer>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="submissionDateString" />
						<YAxis />
						<Tooltip />

						<Legend verticalAlign="top" align="left" height={36} />
						<Line
							name="포트폴리오 평가액"
							dataKey="fundReturns"
							type="monotone"
							stroke={colors.main.primary300}
							dot={true}
						/>
						<Line
							name="S&P 500"
							dataKey="sp500Returns"
							type="monotone"
							stroke={colors.main.primary800}
							dot={true}
						/>
					</LineChart>
				</ResponsiveContainer>
			</Box>
		</Stack>
	);
};

export default AssetEvaluationChart;
