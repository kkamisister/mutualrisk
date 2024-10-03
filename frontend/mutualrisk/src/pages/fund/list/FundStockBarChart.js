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

const FundStockBarChart = ({ data }) => {
	console.log(data);
	return (
		<Box sx={{ fontSize: '12px' }} height="250px" width="100%">
			<ResponsiveContainer>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="code" />
					<YAxis />
					<Tooltip />
					<Bar
						name="보유비율"
						dataKey="currentValue"
						fill={colors.main.primary400}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
};

export default FundStockBarChart;
