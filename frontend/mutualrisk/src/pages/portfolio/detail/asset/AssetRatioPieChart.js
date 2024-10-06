import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Sector } from 'recharts';
import { colors } from 'constants/colors';

const AssetRatioPieChart = ({ assets }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [textWidth, setTextWidth] = useState(0);

	// Pie hover 시 실행되는 함수
	const onPieEnter = useCallback((_, index) => {
		setActiveIndex(index);
	}, []);

	// assets 데이터를 PieChart용 데이터로 변환
	const chartData = useMemo(
		() =>
			assets.map((asset, index) => ({
				name: asset.name, // 자산 이름
				value: asset.weight * 100, // 자산 비율 (퍼센트로 변환)
				color:
					asset.color || colors.piechart[index % colors.piechart.length], // 색상을 colors.piechart에서 가져오기
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
			const font = '20px Arial'; // 텍스트의 폰트 스타일
			const width = getTextWidth(chartData[activeIndex].name, font);
			setTextWidth(width);
		}
	}, [activeIndex, chartData, getTextWidth]);

	// 활성화된 섹터의 정보를 렌더링하는 함수
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

					{/* 텍스트와 rect 요소 */}
					<rect
						x={cx - textWidth / 2 - 10} // 텍스트의 절반 너비만큼 위치 조정하고, 여유 공간 추가
						y={cy - 32} // rect 위치를 더 위로 조정하여 두 줄 텍스트 공간 확보
						width={textWidth + 20} // 텍스트 너비보다 20px 더 크게 설정
						height={64} // rect의 높이를 증가시켜서 두 줄 텍스트가 들어갈 공간 확보
						fill="white"
						opacity={0.8}
						rx={10}
						ry={10}
					/>

					{/* 종목명 텍스트 */}
					<text
						x={cx}
						y={cy - 10} // 첫 번째 텍스트 위치 조정
						textAnchor="middle"
						fill={fill}
						fontSize="22px"
						// fontWeight="bold"
					>
						{payload.name}
					</text>

					{/* 퍼센티지 텍스트 */}
					<text
						x={cx}
						y={cy + 18} // 두 번째 텍스트 위치를 더 아래로 조정
						textAnchor="middle"
						fill="#333"
						fontSize="25px"
						fontWeight="bold">
						{`${payload.value.toFixed(1)}%`} {/* 소수점 2자리까지 표시 */}
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
					{/* 기본 Pie 차트 */}
					<Pie
						activeIndex={activeIndex}
						activeShape={renderActiveShape}
						data={chartData} // 변환된 데이터 사용
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
