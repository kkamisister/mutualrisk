import React, { useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import RenderActiveShape from 'pages/portfolio/detail/asset/RenderActiveShape';

const data = [
	{ name: 'Group A', value: 400, color: '#ff4d4f' },
	{ name: 'Group B', value: 300, color: '#4e73df' },
	{ name: 'Group C', value: 300, color: '#28a745' },
	{ name: 'Group D', value: 200, color: '#ffa500' },
];

const PortfolioPieChart = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const onPieEnter = (_, index) => {
		setActiveIndex(index);
	};

	return (
		<div
			style={{
				minWidth: '350px', // 최소 너비 설정
				height: '100%',
				position: 'relative',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				outline: 'none',
			}}
			tabIndex={-1} // 포커스가 갈 필요가 없는 요소에 대해 tabindex 설정
		>
			<ResponsiveContainer width="100%" height={400}>
				<PieChart>
					<Pie
						activeIndex={activeIndex}
						activeShape={RenderActiveShape} // RenderActiveShape 함수 사용
						data={data}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={70}
						outerRadius={130}
						fill="#8884d8"
						onMouseEnter={onPieEnter} // 마우스 엔터 이벤트
						stroke="none" // 테두리 제거
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default PortfolioPieChart;
