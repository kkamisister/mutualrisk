import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Sector } from 'recharts';
import { colors } from 'constants/colors';

const AssetRatioPieChart = ({ assets, onHover }) => {
	const [activeIndex, setActiveIndex] = useState(1);
	const [textWidth, setTextWidth] = useState(0);

	// Pie hover 시 실행되는 함수
	const onPieEnter = useCallback(
		(_, index) => {
			setActiveIndex(index);
			// 상위 컴포넌트에 현재 hover 중인 인덱스 전달
			onHover(index);
		},
		[onHover]
	);

	// assets 데이터를 PieChart용 데이터로 변환
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

	// 텍스트 너비 측정 함수
	const getTextWidth = useCallback((text, font) => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		context.font = font;
		const metrics = context.measureText(text);
		return metrics.width;
	}, []);

	// 활성화된 섹터가 변경될 때마다 텍스트 너비를 업데이트
	useEffect(() => {
		if (chartData[activeIndex]) {
			const font = '20px Arial';
			const width = getTextWidth(chartData[activeIndex].name, font);
			setTextWidth(width);
		}
	}, [activeIndex, chartData, getTextWidth]);

	const renderActiveShape = useCallback(
		props => {
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

			const hoverInnerRadius = innerRadius - 5;
			const hoverOuterRadius = outerRadius + 10;

			return (
				<g>
					<Sector
						cx={cx}
						cy={cy}
						innerRadius={hoverInnerRadius}
						outerRadius={hoverOuterRadius}
						startAngle={startAngle}
						endAngle={endAngle}
						fill={fill}
					/>
					<rect
						x={cx - textWidth / 2 - 10}
						y={cy - 32}
						width={textWidth + 20}
						height={64}
						fill="white"
						opacity={0.8}
						rx={10}
						ry={10}
					/>
					<text
						x={cx}
						y={cy - 10}
						textAnchor="middle"
						fill={fill}
						fontSize="22px">
						{payload.name}
					</text>
					<text
						x={cx}
						y={cy + 18}
						textAnchor="middle"
						fill="#333"
						fontSize="25px"
						fontWeight="bold">
						{`${payload.value.toFixed(1)}%`}
					</text>
				</g>
			);
		},
		[textWidth]
	);

	return (
		<div
			style={{
				minWidth: '400px',
				height: '100%',
				position: 'relative',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				outline: 'none',
			}}>
			<ResponsiveContainer width="100%" height={400}>
				<PieChart>
					<Pie
						activeIndex={activeIndex}
						activeShape={renderActiveShape}
						data={chartData}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={120}
						outerRadius={180}
						fill="#8884d8"
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

export default AssetRatioPieChart;
