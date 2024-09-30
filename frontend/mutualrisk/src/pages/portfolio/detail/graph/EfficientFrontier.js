import React, { useEffect, useState } from 'react';
import WidgetContainer from 'components/container/WidgetConatiner';
import Title from 'components/title/Title';
import {
	ComposedChart,
	Line,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

// EfficientFrontier 컴포넌트
const EfficientFrontier = () => {
	// API 데이터 상태 관리
	const [frontierPoints, setFrontierPoints] = useState([]);
	const [optimalPerformance, setOptimalPerformance] = useState(null);

	useEffect(() => {
		// 실제 API 연결 부분 주석 처리
		// const fetchData = async () => {
		// 	try {
		// 		const response = await axios.get('/api/efficient-frontier');
		// 		const data = response.data.data;

		// 		setFrontierPoints(data.frontierPoints);
		// 		setOptimalPerformance(data.optimalPerformance);
		// 	} catch (error) {
		// 		console.error('Error fetching efficient frontier data:', error);
		// 	}
		// };

		// fetchData();

		// 100개의 더미 데이터 추가 (API Response에 맞게)
		const dummyFrontierPoints = Array.from({ length: 100 }, (_, index) => ({
			expectedReturn: 0.02 + index * 0.002, // 임의로 증가하는 기대 수익률
			volatility: 0.1 + index * 0.003, // 임의로 증가하는 변동성
			weights: [
				Math.random(), // 임의의 가중치 데이터
				Math.random(),
				Math.random(),
				Math.random(),
			],
		}));
		// 더미 최대 Sharpe Ratio 포인트
		const dummyOptimalPerformance = {
			expectedReturn: 0.6726281197317411,
			volatility: 0.439295773878391,
			sharpeRatio: 1.4856234877242553,
		};
		// 상태 업데이트
		setFrontierPoints(dummyFrontierPoints);
		setOptimalPerformance(dummyOptimalPerformance);
	}, []);

	return (
		<WidgetContainer>
			<Title text={'Efficient Frontier'} />
			<ResponsiveContainer width="100%" height={400}>
				<ComposedChart
					data={frontierPoints} // Efficient Frontier 데이터 사용
					margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="volatility"
						label={{ value: 'Volatility', position: 'insideBottomRight' }}
					/>
					<YAxis
						label={{
							value: 'Expected Return',
							angle: -90,
							position: 'insideLeft',
						}}
					/>
					<Tooltip />
					<Legend />

					{/* Efficient Frontier Line */}
					<Line
						type="monotone"
						dataKey="expectedReturn"
						stroke="#8884d8"
						name="Efficient Frontier"
					/>

					{/* Max Sharpe Ratio (Optimal Performance) */}
					{optimalPerformance && (
						<Scatter
							name="Max Sharpe"
							data={[optimalPerformance]}
							fill="red"
							shape="star"
							dataKey="expectedReturn"
						/>
					)}
				</ComposedChart>
			</ResponsiveContainer>
		</WidgetContainer>
	);
};

export default EfficientFrontier;
