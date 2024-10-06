import React, { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Sector } from 'recharts';
import { colors } from 'constants/colors';

const AssetRatioPieChart = ({ assets }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [textWidth, setTextWidth] = useState(0);

	const onPieEnter = (_, index) => {
		setActiveIndex(index);
	};

	// assets 데이터를 PieChart용 데이터로 변환
	const chartData = assets.map((asset, index) => ({
		name: asset.name, // 자산 이름
		value: asset.weight * 100, // 자산 비율 (퍼센트로 변환)
		color: asset.color || colors.piechart[index % colors.piechart.length], // 색상을 colors.piechart에서 가져오기
	}));

	// 텍스트 너비 측정 함수
	const getTextWidth = (text, font) => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		context.font = font;
		const metrics = context.measureText(text);
		return metrics.width;
	};

	// 활성화된 섹터가 변경될 때마다 텍스트 너비를 업데이트
	useEffect(() => {
		if (chartData[activeIndex]) {
			const font = '20px Arial'; // 텍스트의 폰트 스타일
			const width = getTextWidth(chartData[activeIndex].name, font);
			setTextWidth(width);
		}
	}, [activeIndex, chartData]);

	// 활성화된 섹터의 정보를 렌더링하는 함수
	const renderActiveShape = props => {
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
				{/* 활성화된 섹터 */}
				<Sector
					cx={cx}
					cy={cy}
					innerRadius={hoverInnerRadius}
					outerRadius={hoverOuterRadius}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={fill}
				/>

				{/* 텍스트 너비에 맞춰 rect 너비 설정 */}
				<rect
					x={cx - textWidth / 2 - 10} // 텍스트의 절반 너비만큼 위치 조정하고, 여유 공간 추가
					y={cy - 16}
					width={textWidth + 20} // 텍스트 너비보다 20px 더 크게 설정
					height={32}
					fill="white"
					opacity={0.1}
					rx={10}
					ry={10}
				/>

				{/* 종목명 텍스트 */}
				<text
					x={cx}
					y={cy}
					dy={8}
					textAnchor="middle"
					fill={fill}
					fontSize="20px">
					{payload.name}
				</text>
			</g>
		);
	};

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
					{/* 기본 Pie 차트 */}
					<Pie
						activeIndex={activeIndex}
						activeShape={renderActiveShape}
						data={chartData} // 변환된 데이터 사용
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={90}
						outerRadius={160}
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
