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

const BackTestChart = ({
	portfolioId,
	timeInterval = 'month',
	measure = 'profit',
	inflationAdjusted = false,
}) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		// 백엔드 API 호출 부분을 주석 처리
		// async function fetchData() {
		//   try {
		//     const response = await axios.get(`/api/v1/portfolio/backtest`, {
		//       params: {
		//         portfolioId,
		//         timeInterval,
		//         measure,
		//         inflationAdjusted`
		//       }
		//     });
		//     const responseData = response.data.data.performances.map(item => ({
		//       time: new Date(item.time).toISOString().split('T')[0], // 날짜 형식 변환
		//       valuation: item.valuation
		//     }));
		//     setData(responseData);
		//   } catch (error) {
		//     console.error("Error fetching backtesting data:", error);
		//   }
		// }

		// 더미 데이터 추가
		const dummyData = [
			{ time: '2012-01', portfolioValuation: 10000, benchmark: 10000 },
			{ time: '2013-01', portfolioValuation: 11000, benchmark: 11500 },
			{ time: '2014-01', portfolioValuation: 12000, benchmark: 12500 },
			{ time: '2015-01', portfolioValuation: 13000, benchmark: 13500 },
			{ time: '2016-01', portfolioValuation: 14000, benchmark: 14000 },
			{ time: '2017-01', portfolioValuation: 16000, benchmark: 17000 },
			{ time: '2018-01', portfolioValuation: 18000, benchmark: 19000 },
			{ time: '2019-01', portfolioValuation: 20000, benchmark: 21000 },
			{ time: '2020-01', portfolioValuation: 22000, benchmark: 23000 },
			{ time: '2021-01', portfolioValuation: 25000, benchmark: 26000 },
			{ time: '2022-01', portfolioValuation: 28000, benchmark: 29000 },
			{ time: '2023-01', portfolioValuation: 32000, benchmark: 33000 },
		];

		setData(dummyData);
	}, [portfolioId, timeInterval, measure, inflationAdjusted]);

	return (
		<WidgetContainer>
			<Title text={'백테스팅'} />
			<ResponsiveContainer width="100%" height={400}>
				<LineChart
					data={data}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="time" />
					<YAxis />
					<Tooltip />
					<Legend />
					{/* 두 개의 포트폴리오 성과 */}
					<Line
						type="monotone"
						dataKey="portfolioValuation"
						name="리밸런싱 포트폴리오 평가가치"
						stroke="#8884d8"
					/>
					{/* 예시: SP500과 비교하는 경우 */}
					<Line
						type="monotone"
						dataKey="benchmark"
						name="SP500 Benchmark"
						stroke="#82ca9d"
					/>
				</LineChart>
			</ResponsiveContainer>
		</WidgetContainer>
	);
};

export default BackTestChart;
