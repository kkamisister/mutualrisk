import React, { useEffect, useState } from 'react';
import WidgetContainer from 'components/container/WidgetConatiner';
import Title from 'components/title/Title';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { Stack } from '@mui/material';
import StockMenuButton from 'pages/stock/detail/StockMenuButton';
import { colors } from 'constants/colors';
import { fetchStockDetailByAssetId } from 'utils/apis/analyze'; // API 요청 함수

const BackTesting = ({
	portfolioId,
	timeInterval = 'day', // 기본 값으로 'day'
	measure = 'profit', // 기본 값으로 'profit'
	inflationAdjusted = false,
}) => {
	const [data, setData] = useState([]);
	const [tabMenu, setTabMenu] = useState(timeInterval); // 탭 메뉴 초기 값은 timeInterval로 설정
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// API 호출 함수
	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				const response = await fetchStockDetailByAssetId(
					portfolioId,
					tabMenu, // 사용자가 선택한 timeInterval 값을 전달
					measure
				);
				// 받아온 데이터를 적절히 변환하여 사용
				const responseData = response.performances.map(item => ({
					time: new Date(item.time).toISOString().split('T')[0], // 날짜 형식 변환
					valuation: item.valuation,
				}));
				setData(responseData);
			} catch (error) {
				console.error('Error fetching backtesting data:', error);
				setError('데이터를 가져오는 중 오류가 발생했습니다.');
			} finally {
				setLoading(false);
			}
		}

		if (portfolioId) {
			fetchData(); // timeInterval이 변경될 때마다 데이터를 다시 가져옴
		}
	}, [portfolioId, tabMenu, measure]); // tabMenu가 변경될 때마다 useEffect 실행

	// 데이터가 없을 경우 처리
	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	// 데이터의 최소값과 최대값을 계산
	const minValue = Math.min(...data.map(item => item.valuation));
	const maxValue = Math.max(...data.map(item => item.valuation));

	// 숫자를 세 자리마다 콤마 추가하는 함수 (소수점 제거)
	const formatNumber = value => {
		return Math.floor(value)
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	// Tooltip에서 원 단위로 표시하는 함수
	const formatCurrency = value => {
		return `${formatNumber(value)} 원`;
	};

	return (
		<WidgetContainer>
			<Title text="백테스팅" />
			<Stack
				direction="row"
				spacing={1}
				sx={{
					backgroundColor: colors.background.primary,
					width: 'fit-content',
					borderRadius: '100px',
					border: `1px solid ${colors.point.stroke}`,
				}}>
				{/* 각 버튼 클릭 시 setTabMenu로 timeInterval 값 변경 */}
				<StockMenuButton
					label="일"
					value="day"
					onChange={() => setTabMenu('day')}
					selected={tabMenu === 'day'}
				/>
				<StockMenuButton
					label="주"
					value="week"
					onChange={() => setTabMenu('week')}
					selected={tabMenu === 'week'}
				/>
				<StockMenuButton
					label="월"
					value="month"
					onChange={() => setTabMenu('month')}
					selected={tabMenu === 'month'}
				/>
				<StockMenuButton
					label="년"
					value="year"
					onChange={() => setTabMenu('year')}
					selected={tabMenu === 'year'}
				/>
			</Stack>

			{/* 데이터가 없을 경우 처리 */}
			{data.length === 0 ? (
				<div>No data available</div>
			) : (
				<ResponsiveContainer width="100%" height={400}>
					<LineChart
						data={data}
						margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="time" />
						<YAxis
							domain={[minValue * 0.9, maxValue * 1.1]} // 최소값, 최대값에 여유를 두어 설정
							tickCount={6} // 적절한 갯수로 Y축 라벨 표시
							tickFormatter={formatNumber} // 세 자리마다 콤마 표시, 소수점 제거
						/>
						<Tooltip
							formatter={value => `${formatCurrency(value)}`} // 툴팁에서 값 표시 (원 단위)
						/>
						<Legend />
						<Line
							type="monotone"
							dataKey="valuation"
							name="Portfolio Valuation"
							stroke="#8884d8"
						/>
					</LineChart>
				</ResponsiveContainer>
			)}
		</WidgetContainer>
	);
};

export default BackTesting;
