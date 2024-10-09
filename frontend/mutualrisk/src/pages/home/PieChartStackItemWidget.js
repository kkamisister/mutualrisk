import { Stack, Typography, Box } from '@mui/material';
import React from 'react';
import CustomButton from 'components/button/BasicButton';
import { colors } from 'constants/colors';
import { useNavigate } from 'react-router-dom';

import {
	PieChart,
	Pie,
	Sector,
	Legend,
	Cell,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';

const data = [
	{ name: '삼성전자', value: 400 },
	{ name: 'Apple Inc.', value: 300 },
	{ name: 'Kodex MSCI퀄리티', value: 300 },
	{ name: 'Coca-Cola Co', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

const PieChartStackItemWidget = () => {
	const navigate = useNavigate();
	return (
		<Stack
			direction="row"
			spacing={5}
			sx={{
				width: '100%',
				height: '100%',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Box
				sx={{
					fontSize: '12px',
					height: '400px',
					width: '650px',
				}}>
				<ResponsiveContainer width="100%" height="100%">
					<PieChart width={400} height={400}>
						<Tooltip data={data} />
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							labelLine={false}
							label={renderCustomizedLabel}
							outerRadius={150}
							fill="#8884d8"
							dataKey="value">
							{data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Legend verticalAlign="bottom" height={12} />
					</PieChart>
				</ResponsiveContainer>
			</Box>
			<Stack
				spacing={2}
				sx={{
					justifyContent: 'center',
					alignItems: 'flex-start',
				}}>
				<Stack spacing={0}>
					<Box
						sx={{
							fontWeight: 'bold',
							color: colors.text.sub1,
							textAlign: 'left', // 좌측 정렬
							maxWidth: '100%', // 최대 너비 설정
							fontSize: '50px',
							lineHeight: '1', // 줄 간격 설정
							whiteSpace: 'nowrap',
							letterSpacing: '-2px',
						}}>
						투자의 황금 비율을
					</Box>
					<Box
						sx={{
							fontWeight: 'bold',
							color: colors.main.primary500,
							textAlign: 'left', // 좌측 정렬
							maxWidth: '100%', // 최대 너비 설정
							fontSize: '50px',
							lineHeight: '1.5', // 줄 간격 설정
							whiteSpace: 'nowrap',
							letterSpacing: '-2px',
						}}>
						간편하게
					</Box>
					<Box
						sx={{
							fontWeight: 'bold',
							color: colors.text.sub1,
							textAlign: 'left', // 좌측 정렬
							maxWidth: '100%', // 최대 너비 설정
							fontSize: '25px',
							lineHeight: '1.5', // 줄 간격 설정
							whiteSpace: 'nowrap',
							letterSpacing: '-2px',
						}}>
						위험을 최소화하세요
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default PieChartStackItemWidget;
