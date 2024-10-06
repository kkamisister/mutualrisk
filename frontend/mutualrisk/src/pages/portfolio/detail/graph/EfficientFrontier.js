import React, { useEffect, useState } from 'react';
import WidgetContainer from 'components/container/WidgetConatiner';
import Title from 'components/title/Title';
import {
	ComposedChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Scatter,
} from 'recharts';
import { fetchEfficientFrontierByPorfolioId } from 'utils/apis/analyze';

const EfficientFrontier = ({ portfolioId }) => {
	const [frontierPoints, setFrontierPoints] = useState([]);
	const [optimalPerformance, setOptimalPerformance] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchEfficientFrontierByPorfolioId(portfolioId);
				setFrontierPoints(data.frontierPoints);
				setOptimalPerformance(data.optimalPerformance);
			} catch (error) {
				console.error('Error fetching efficient frontier data:', error);
			}
		};

		if (portfolioId) {
			fetchData();
		}
	}, [portfolioId]);

	// 퍼센티지 변환 함수
	const percentFormatter = value => `${(value * 100).toFixed(2)}%`;

	return (
		<WidgetContainer>
			<Title text="효율적 포트폴리오 곡선" />
			<ResponsiveContainer width="100%" height={400}>
				<ComposedChart
					data={frontierPoints}
					margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="volatility"
						label={{
							value: '변동성 (위험도)',
							position: 'insideBottom',
							offset: -15,
						}}
						type="number"
						domain={['auto', 'auto']}
						tickCount={5}
						tickFormatter={percentFormatter}
					/>
					<YAxis
						dataKey="expectedReturn"
						label={{
							value: '기대 수익률',
							angle: -90,
							position: 'insideLeft',
							offset: -10,
						}}
						type="number"
						domain={['auto', 'auto']}
						tickCount={5}
						tickFormatter={percentFormatter}
					/>
					<Tooltip
						formatter={percentFormatter}
						labelFormatter={value => `변동성: ${percentFormatter(value)}`}
						cursor={{ strokeDasharray: '3 3' }}
					/>
					<Line
						type="monotone"
						dataKey="expectedReturn"
						stroke="#000000"
						name="기대 수익률"
						dot
					/>

					{/* {optimalPerformance && (
						<Scatter
							name="최적 성과"
							data={[optimalPerformance]}
							fill="#FF0000"
							shape="star"
							// dataKey를 제거여 Scatter의 툴팁과 혼동되지 않도록 설정
						/>
					)} */}
				</ComposedChart>
			</ResponsiveContainer>
		</WidgetContainer>
	);
};

export default EfficientFrontier;
