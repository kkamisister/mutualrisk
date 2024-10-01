import React from 'react';
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

	const hoverInnerRadius = innerRadius - 5;
	const hoverOuterRadius = outerRadius + 10;

	return (
		<g>
			<text
				x={cx}
				y={cy}
				dy={8}
				textAnchor="middle"
				fill={fill}
				fontSize="20px">
				{payload.name}
			</text>

			<Sector
				cx={cx}
				cy={cy}
				innerRadius={hoverInnerRadius}
				outerRadius={hoverOuterRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
		</g>
	);
};

export default RenderActiveShape;
