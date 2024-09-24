import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
	{ name: 'Group A', value: 400 },
	{ name: 'Group B', value: 300 },
	{ name: 'Group C', value: 300 },
	{ name: 'Group D', value: 200 },
];

const AssetRatioPieChart = () => {
	return (
		<div style={{ width: '100%', minWidth: 0, flex: 1 }}>
			<ResponsiveContainer width="100%" height={300}>
				<PieChart>
					<Pie
						data={data}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={100}
						fill="#8884d8"
						label
					/>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default AssetRatioPieChart;
