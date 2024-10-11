import React from 'react';
import { useQuery } from '@tanstack/react-query';
import WidgetContainer from 'components/container/WidgetConatiner';
import Title from 'components/title/Title';
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { fetchSectorByPorfolioId } from 'utils/apis/analyze';
import { colors } from 'constants/colors'; // colors import

// 퍼센티지 형식으로 값을 변환하는 함수
const formatPercentage = value => `${value.toFixed(1)}%`;

const EquitySectors = ({ portfolioId }) => {
	// React Query를 사용해 API 요청
	const {
		data: sectorData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['sectorData', portfolioId],
		queryFn: () => fetchSectorByPorfolioId(portfolioId),
		staleTime: 300000, // 데이터가 5분 동안 신선하게 유지됨
		refetchOnWindowFocus: false,
	});

	// 로딩 상태 처리
	if (isLoading) {
		return <div>Loading...</div>;
	}

	// 에러 처리
	if (isError) {
		return <div>섹터 데이터를 가져오는 중 오류가 발생했습니다.</div>;
	}

	return (
		<WidgetContainer>
			<Title text={'종목 섹터'} />
			<ResponsiveContainer width="100%" height={400}>
				<PieChart>
					<Pie
						data={sectorData}
						dataKey="weight"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={150}
						fill="#8884d8"
						label={
							({ name, percent }) =>
								`${name}: ${formatPercentage(
									percent * 100
								)}` /* 소수점 1자리 퍼센트 표시 */
						}>
						{sectorData.map((entry, index) => (
							<Cell
								key={`cell-${entry.sectorId}`}
								fill={colors.piechart[index % colors.piechart.length]} // colors.piechart 배열에서 색상 사용
							/>
						))}
					</Pie>
					<Tooltip formatter={value => formatPercentage(value)} />{' '}
					{/* 툴팁에서도 퍼센티지 표시 */}
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</WidgetContainer>
	);
};

export default EquitySectors;
