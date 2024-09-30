import React, { useEffect, useState } from 'react';
import WidgetContainer from 'components/container/WidgetConatiner';
import Title from 'components/title/Title';
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
// import axios from 'axios';

// 색상 배열 (섹터별 색상 구분을 위해 사용)
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const EquitySectors = () => {
	const [sectorData, setSectorData] = useState([]);

	useEffect(() => {
		// API
		/*
		const fetchData = async () => {
			try {
				const response = await axios.get('/api/v1/portfolio/sector');
				setSectorData(response.data.data);
			} catch (error) {
				console.error("Error fetching sector data:", error);
			}
		};

		fetchData();
		*/

		// 더미 데이터 (API 연결 전에 UI 확인용)
		const dummySectorData = [
			{ sectorId: 5, name: 'Technology', weight: 30.91 },
			{ sectorId: 4, name: 'Consumer Discretionary', weight: 69.09 },
		];

		setSectorData(dummySectorData);
	}, []);

	return (
		<WidgetContainer>
			<Title text={'Equity Sectors'} />
			<ResponsiveContainer width="100%" height={400}>
				<PieChart>
					<Pie
						data={sectorData}
						dataKey="weight"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={150}
						fill="#8884d8"
						label>
						{sectorData.map((entry, index) => (
							<Cell
								key={`cell-${entry.sectorId}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</WidgetContainer>
	);
};

export default EquitySectors;
