import * as React from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Stack, Box } from '@mui/material';
import { colors } from 'constants/colors';
import WidgetContainer from 'components/container/WidgetConatiner';
import SubTitle from 'components/title/SubTitle';
import {
	PieChart,
	Pie,
	Sector,
	Cell,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';

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

const EtfCompositionWidget = ({ data }) => {
	const columns = [
		{
			field: '구성종목(자산)',
			headerAlign: 'left',
			align: 'left',
			width: 300,
		},
		{
			field: '주식수',
			headerAlign: 'right',
			align: 'right',
			width: 140,
			valueFormatter: value => value.toLocaleString(),
		},
	];
	const rows = data.map((asset, idx) => {
		return {
			id: idx,
			align: 'center',
			'구성종목(자산)': asset.assetName,
			주식수: asset.stockCount,
		};
	});

	const pieData = data
		.filter(item => item.stockCount !== '-')
		.map(item => ({
			...item,
			stockCount: parseInt(item.stockCount, 10),
		}));
	console.log(pieData);
	return (
		<WidgetContainer>
			<Stack spacing={1}>
				<SubTitle text="포트폴리오 구성 요소" />
				<Stack
					direction="row"
					sx={{ justifyContent: 'center', alignItems: 'center' }}>
					<Box sx={{ width: '400px', height: '400px' }}>
						<ResponsiveContainer width="100%" height="100%">
							<PieChart width={400} height={400}>
								<Pie
									data={pieData}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={renderCustomizedLabel}
									outerRadius={150}
									dataKey="stockCount"
									nameKey="assetName">
									{data.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={
												colors.piechart[
													index % colors.piechart.length
												]
											}
										/>
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</Box>
					<DataGrid
						sx={{
							'& .MuiDataGrid-footerContainer': { display: 'none' },
							'$ .MuiDataGrid-filler': { display: 'none' },
							borderRadius: '10px',
							height: 'fit-content',
						}}
						rows={rows}
						columns={columns}
					/>
				</Stack>
			</Stack>
		</WidgetContainer>
	);
};
export default EtfCompositionWidget;
