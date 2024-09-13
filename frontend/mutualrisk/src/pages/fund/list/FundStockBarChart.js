import React from 'react';
import { Box } from '@mui/material';
import {
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Bar,
	ResponsiveContainer,
} from 'recharts';
import { colors } from 'constants/colors';
const data = [
	{
		name: '종목 A',
		보유수: 4000,
		pv: 2400,
	},
	{
		name: '종목 B',
		보유수: 3000,
		pv: 1398,
	},
	{
		name: '종목 C',
		보유수: 2000,
		pv: 9800,
	},
	{
		name: '종목 D',
		보유수: 2780,
		pv: 3908,
	},
	{
		name: '종목 E',
		보유수: 1890,
		pv: 4800,
	},
	{
		name: '종목 F',
		보유수: 2390,
		pv: 3800,
	},
	{
		name: '종목 G',
		보유수: 3490,
		pv: 4300,
	},
	{
		name: '종목 G',
		보유수: 3490,
		pv: 4300,
	},
	{
		name: '종목 G',
		보유수: 3490,
		pv: 4300,
	},
	{
		name: '종목 G',
		보유수: 3490,
		pv: 4300,
	},
	{
		name: '종목 G',
		보유수: 3490,
		pv: 4300,
	},
];

const FundStockBarChart = () => {
	return (
		<Box sx={{ fontSize: '12px' }} height="250px" width="100%">
			<ResponsiveContainer>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="보유수" fill={colors.main.primary200} />
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
};

export default FundStockBarChart;
