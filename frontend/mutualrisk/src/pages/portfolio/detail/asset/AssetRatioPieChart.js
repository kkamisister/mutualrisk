import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

// 샘플 데이터
const data = [
	{ name: 'Group A', value: 400 },
	{ name: 'Group B', value: 300 },
	{ name: 'Group C', value: 300 },
	{ name: 'Group D', value: 200 },
];

const AssetRatioPieChart = () => {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<PieChart>
				<Pie
					data={data}
					dataKey="value"
					nameKey="name"
					cx="50%" // X축 기준으로 중앙 배치
					cy="50%" // Y축 기준으로 중앙 배치
					outerRadius={100} // 차트의 크기
					fill="#8884d8" // 차트 색상
					label // 라벨 표시
				/>
				<Tooltip /> {/* 툴팁을 제공하여 데이터 포인트 설명 */}
			</PieChart>
		</ResponsiveContainer>
	);
};

export default AssetRatioPieChart;
