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
	const normalizedData = data.map(asset => {
		asset.valueOfHolding = Math.round(asset.valueOfHolding / 10000000);
		return asset;
	});
	return (
		<Box sx={{ fontSize: '12px' }} height="270px" width="100%">
			<ResponsiveContainer>
				<BarChart data={normalizedData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="code" />
					<YAxis />
					<Tooltip />
					<Bar
						name="보유비율"
						dataKey="valueOfHolding"
						fill={colors.main.primary300}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
};

export default FundStockBarChart;
