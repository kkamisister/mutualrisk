import { useQuery } from '@tanstack/react-query';
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { fetchAssetHistoryByAssetId } from 'utils/apis/asset';
import {
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Line,
	ResponsiveContainer,
} from 'recharts';
const ChartWidget = ({ assetId }) => {
	const { isLoading, data } = useQuery({
		queryKey: ['assetDetail', assetId], // keyword를 queryKey에 포함하여 키워드가 변경되면 새로운 요청 실행
		queryFn: () => fetchAssetHistoryByAssetId({ assetId, period: 300 }),
		placeholderData: { records: [] },
	});
	return (
		<ResponsiveContainer>
			<LineChart
				height={250}
				data={data.records}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line type="monotone" dataKey="price" stroke="#8884d8" />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default ChartWidget;
