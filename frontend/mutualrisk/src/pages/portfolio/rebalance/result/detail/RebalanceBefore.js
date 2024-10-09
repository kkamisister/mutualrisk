import React, { useState } from 'react';
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
import { colors } from 'constants/colors';
import PortfolioAssetList from '../../main/piechart/PortfolioAssetList';

const data = [
	{
		name: '삼성전자',
		value: 30,
		color: colors.main.primary200,
		code: '005930', // 자산 코드
		market: 'KOSPI',
		weight: 0.3,
	},
	{
		name: '테슬라',
		value: 30,
		color: '#ff4d4d', // Tesla의 빨간색
		code: 'TSLA',
		market: 'NASDAQ',
		weight: 0.3,
	},
	{
		name: '엔비디아',
		value: 30,
		color: '#00b33c', // Nvidia의 녹색
		code: 'NVDA',
		market: 'NASDAQ',
		weight: 0.3,
	},
	{
		name: 'TIGER 미국달러단기채권액티브',
		value: 30,
		color: '#ff9933', // TIGER의 주황색
		code: '276990',
		market: 'KOSPI',
		weight: 0.3,
	},
];

const RebalanceBefore = () => {
	const [highlightedStockIndex, setHighlightedStockIndex] = useState(null);

	return (
		<DetailContainer title={'기존 포트폴리오'}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<ResponsiveContainer width="60%" height={300}>
					<BarChart
						data={data}
						layout="vertical"
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
						barSize={20}
						onMouseMove={state => {
							if (state.isTooltipActive) {
								const index = state.activeTooltipIndex; // 마우스가 위치한 바의 인덱스를 가져옴
								setHighlightedStockIndex(index);
							} else {
								setHighlightedStockIndex(null);
							}
						}}>
						<XAxis type="number" />
						<YAxis type="category" dataKey="name" />
						<Tooltip />
						{/* <Legend /> */}
						<CartesianGrid strokeDasharray="3 3" />
						<Bar
							dataKey="value"
							name="비율"
							fill={colors.main.primary500}
							background={{ fill: '#eee' }}
						/>
					</BarChart>
				</ResponsiveContainer>

				{/* PortfolioAssetList로 UI 대체 */}
				<PortfolioAssetList
					assets={data}
					hoveredIndex={highlightedStockIndex} // 강조될 항목의 인덱스 전달
				/>
			</div>
		</DetailContainer>
	);
};

export default RebalanceBefore;
