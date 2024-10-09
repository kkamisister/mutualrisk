import React, { useState, useEffect } from 'react';
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

const FundStockBarChart = ({ data, dataName, dataKey }) => {
	console.log({ data, dataName, dataKey });
	return (
		<Box sx={{ fontSize: '12px' }} height="270px" width="100%">
			<ResponsiveContainer>
				<BarChart
					data={data.map(asset => {
						const normalized = { ...asset };
						normalized[dataKey] = normalized[dataKey] / 100000;
						return normalized;
					})}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="code" />
					<YAxis />
					<Tooltip />
					<Bar
						name={dataName}
						dataKey={dataKey}
						fill={colors.main.primary300}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
};

export default FundStockBarChart;
