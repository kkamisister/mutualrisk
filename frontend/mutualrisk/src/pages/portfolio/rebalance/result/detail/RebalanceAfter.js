import React, { PureComponent } from 'react';
import DetailContainer from 'pages/portfolio/rebalance/result/detail/DetailContainer';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
const data = [
	{
		name: 'Page A',
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: 'Page B',
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: 'Page C',
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: 'Page D',
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: 'Page E',
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: 'Page F',
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: 'Page G',
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];
const RebalanceAfter = () => {
	return (
		<DetailContainer title={'리밸런싱'}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={500}
					height={300}
					data={data}
					layout="vertical" // 세로 막대 그래프 설정
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
					barSize={20}>
					<XAxis type="number" /> {/* X축은 수량이니까 숫자로 설정 */}
					<YAxis type="category" dataKey="name" /> {/* Y축은 카테고리 */}
					<Tooltip />
					<Legend />
					<CartesianGrid strokeDasharray="3 3" />
					<Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
				</BarChart>
			</ResponsiveContainer>
		</DetailContainer>
	);
};

export default RebalanceAfter;
