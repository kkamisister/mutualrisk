import React, { useEffect, useState } from 'react';
import { Sector } from 'recharts';

const RenderActiveShape = props => {
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

	const [textWidth, setTextWidth] = useState(0);

	// 텍스트의 너비를 측정하는 함수
	const getTextWidth = (text, font) => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		context.font = font;
		const metrics = context.measureText(text);
		return metrics.width;
	};

	useEffect(() => {
		// 텍스트의 너비를 측정하고 상태에 저장
		const font = '20px Arial'; // 텍스트의 폰트 스타일과 크기
		const width = getTextWidth(payload.name, font);
		setTextWidth(width);
	}, [payload.name]);

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
				opacity={0.8}
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

export default RenderActiveShape;
