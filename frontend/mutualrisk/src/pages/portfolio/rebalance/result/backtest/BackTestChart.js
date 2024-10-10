import React, { useEffect, useState } from 'react';
import WidgetContainer from 'components/container/WidgetConatiner';
import Title from 'components/title/Title';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const BackTestChart = ({ backtestingData }) => {
	const [data, setData] = useState([]);
	const [yDomain, setYDomain] = useState([0, 'auto']);

	useEffect(() => {
		if (backtestingData) {
			const benchmarkPerformances =
				backtestingData.data.benchMark.performances || [];
			const portfolioPerformances =
				backtestingData.data.portfolioValuation.performances || [];

			const mergedData = benchmarkPerformances
				.map((benchmarkItem, index) => {
					const portfolioItem = portfolioPerformances[index] || {};
					const benchmarkValuation = benchmarkItem.valuation;
					const portfolioValuation = portfolioItem.valuation;

					if (benchmarkValuation || portfolioValuation) {
						return {
							time: new Date(benchmarkItem.time)
								.toISOString()
								.split('T')[0],
							benchmark: benchmarkValuation || 0,
							portfolioValuation: portfolioValuation || 0,
						};
					}
					return null;
				})
				.filter(item => item !== null);

			const allValuations = mergedData.flatMap(item => [
				item.benchmark,
				item.portfolioValuation,
			]);
			const minValuation = Math.min(...allValuations);
			const maxValuation = Math.max(...allValuations);

			setYDomain([minValuation, maxValuation]);
			setData(mergedData);
		}
	}, [backtestingData]);

	return (
		<WidgetContainer>
			<Title text={'백테스팅 결과'} />
			<ResponsiveContainer width="100%" height={400}>
				<LineChart
					data={data}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="time" />
					<YAxis domain={yDomain} />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey="portfolioValuation"
						name="리밸런싱 포트폴리오 평가가치"
						stroke="#8884d8"
					/>
					<Line
						type="monotone"
						dataKey="benchmark"
						name="기존 포트폴리오 평가가치"
						stroke="#82ca9d"
					/>
				</LineChart>
			</ResponsiveContainer>
		</WidgetContainer>
	);
};

export default BackTestChart;
