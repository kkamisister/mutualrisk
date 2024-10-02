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
import styled from 'styled-components';

const data = [
	{
		name: '삼성전자',
		value: 30,
		color: colors.main.primary200,
	},
	{
		name: '테슬라',
		value: 30,
		color: '#ff4d4d', // Tesla의 빨간색
	},
	{
		name: '엔비디아',
		value: 30,
		color: '#00b33c', // Nvidia의 녹색
	},
	{
		name: 'TIGER 미국달러단기채권액티브',
		value: 30,
		color: '#ff9933', // TIGER의 주황색
	},
];

const StockList = styled.ul`
	list-style: none;
	padding: 0;
	margin-left: 20px;
`;

const StockItem = styled.li`
	display: flex;
	align-items: center;
	padding: 10px;
	margin-bottom: 10px;
	transition: transform 0.2s;
	background-color: #f9f9f9;
	border-radius: 5px;

	&:hover {
		transform: scale(1.05);
	}

	${props =>
		props.highlighted &&
		`
        transform: scale(1.1);
        background-color: #e6f7ff;
    `}
`;

const ColorBlock = styled.div`
	width: 20px;
	height: 20px;
	background-color: ${props => props.color};
	margin-right: 10px;
`;

const RebalanceAfter = () => {
	const [highlightedStock, setHighlightedStock] = useState(null);

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
								const { payload } = state.activePayload[0];
								setHighlightedStock(payload.name);
							} else {
								setHighlightedStock(null);
							}
						}}>
						<XAxis type="number" />
						<YAxis type="category" dataKey="name" />
						<Tooltip />
						<Legend />
						<CartesianGrid strokeDasharray="3 3" />
						<Bar
							dataKey="value"
							fill={colors.main.primary200}
							background={{ fill: '#eee' }}
						/>
					</BarChart>
				</ResponsiveContainer>
				<StockList>
					{data.map(stock => (
						<StockItem
							key={stock.name}
							highlighted={highlightedStock === stock.name}>
							<ColorBlock color={stock.color} />
							{stock.name} {stock.value}%
						</StockItem>
					))}
				</StockList>
			</div>
		</DetailContainer>
	);
};

export default RebalanceAfter;
