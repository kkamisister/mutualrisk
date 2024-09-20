import React from 'react';
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
const data = [
	{
		name: '2013년',
		평가액: 12.34,
		'S&P 500': 5.67,
	},
	{
		name: '2014년',
		평가액: -3.45,
		'S&P 500': 10.12,
	},
	{
		name: '2015년',
		평가액: 0.99,
		'S&P 500': 7.88,
	},
	{
		name: '2016년',
		평가액: 14.75,
		'S&P 500': 2.22,
	},
	{
		name: '2017년',
		평가액: -1.23,
		'S&P 500': 13.56,
	},
	{
		name: '2018년',
		평가액: 3.14,
		'S&P 500': 11.11,
	},
	{
		name: '2019년',
		평가액: 6.78,
		'S&P 500': -8.9,
	},
	{
		name: '2020년',
		평가액: 10.0,
		'S&P 500': 0.5,
	},
	{
		name: '2021년',
		평가액: -4.56,
		'S&P 500': 14.0,
	},
	{
		name: '2022년',
		평가액: 7.34,
		'S&P 500': -2.22,
	},
	{
		name: '2023년',
		평가액: 15.0,
		'S&P 500': 3.67,
	},
	{
		name: '2024년',
		평가액: 8.9,
		'S&P 500': 1.23,
	},
];

const AssetEvaluationChart = ({ title }) => {
	const [alignment, setAlignment] = React.useState('web');

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
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
					value={alignment}
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
					<ToggleButton value="web">분기</ToggleButton>
					<ToggleButton value="android">반기</ToggleButton>
					<ToggleButton value="ios">1년</ToggleButton>
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
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />

						<Legend verticalAlign="top" align="left" height={36} />
						<Line
							name="포트폴리오 평가액"
							dataKey="평가액"
							type="monotone"
							stroke={colors.main.primary300}
							dot={true}
						/>
						<Line
							name="S&P 500"
							dataKey="S&P 500"
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
