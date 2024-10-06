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
import { fetchStockDetailByAssetId } from 'utils/apis/analyze';

const BackTesting = ({
	portfolioId,
	timeInterval = 'day',
	measure = 'profit',
	inflationAdjusted = false,
}) => {
	const [data, setData] = useState([]);
	const [tabMenu, setTabMenu] = useState(timeInterval);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				const response = await fetchStockDetailByAssetId(
					portfolioId,
					tabMenu,
					measure
				);
				let responseData = response.performances.map(item => ({
					time: new Date(item.time).toISOString().split('T')[0],
					valuation: item.valuation,
				}));

				if (tabMenu === 'year') {
					responseData = responseData.slice(-10);
				}

				setData(responseData);
			} catch (error) {
				console.error('Error fetching backtesting data:', error);
				setError('데이터를 가져오는 중 오류가 발생했습니다.');
			} finally {
				setLoading(false);
			}
		}

		if (portfolioId) {
			fetchData();
		}
	}, [portfolioId, tabMenu, measure]);

	if (error) {
		return <div>{error}</div>;
	}

	const minValue = Math.min(...data.map(item => item.valuation));
	const maxValue = Math.max(...data.map(item => item.valuation));

	const formatNumber = value => {
		return Math.floor(value)
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

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

			<ResponsiveContainer
				width="100%"
				height={400}
				style={{ opacity: loading ? 0.5 : 1 }}>
				<LineChart
					data={data}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="time" />
					<YAxis
						domain={[minValue * 0.9, maxValue * 1.1]}
						tickCount={6}
						tickFormatter={formatNumber}
					/>
					<Tooltip formatter={value => `${formatCurrency(value)}`} />
					<Legend />
					<Line
						type="monotone"
						dataKey="valuation"
						name="포트폴리오 평가 가치"
						stroke="#8884d8"
					/>
				</LineChart>
			</ResponsiveContainer>
		</WidgetContainer>
	);
};

export default BackTesting;
