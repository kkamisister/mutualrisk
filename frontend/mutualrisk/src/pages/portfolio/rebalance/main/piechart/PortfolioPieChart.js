import React, { useState, useCallback, useMemo } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Sector } from 'recharts';
import { colors } from 'constants/colors';

const PortfolioPieChart = ({ assets, onHover }) => {
	const [activeIndex, setActiveIndex] = useState(1);

	const onPieEnter = useCallback(
		(_, index) => {
			setActiveIndex(index);
			onHover(index);
		},
		[onHover]
	);

	const chartData = useMemo(
		() =>
			assets.map((asset, index) => ({
				name: asset.name,
				value: asset.weight * 100,
				color:
					asset.color || colors.piechart[index % colors.piechart.length],
			})),
		[assets]
	);

	const renderActiveShape = useCallback(props => {
		const {
			cx,
			cy,
			innerRadius,
			outerRadius,
			startAngle,
			endAngle,
			fill,
			payload,
		} = props;

		return (
			<g>
				<Sector
					cx={cx}
					cy={cy}
					innerRadius={innerRadius - 5}
					outerRadius={outerRadius + 10}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={fill}
				/>
				<text
					x={cx}
					y={cy}
					textAnchor="middle"
					dominantBaseline="middle"
					fill={fill}
					fontSize="22px">
					{payload.value.toFixed(1)}%
				</text>
			</g>
		);
	}, []);

	return (
		<div
			style={{
				minWidth: '400px',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<ResponsiveContainer width="100%" height={450}>
				<PieChart>
					<Pie
						activeIndex={activeIndex}
						activeShape={renderActiveShape}
						data={chartData}
						dataKey="value"
						cx="50%"
						cy="50%"
						innerRadius={60}
						outerRadius={130}
						onMouseEnter={onPieEnter}
						stroke="none">
						{chartData.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default PortfolioPieChart;
