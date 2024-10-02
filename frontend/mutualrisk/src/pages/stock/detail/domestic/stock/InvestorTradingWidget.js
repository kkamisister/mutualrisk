import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { colors } from 'constants/colors';
import SubTitle from 'components/title/SubTitle';
import {
	ResponsiveContainer,
	XAxis,
	YAxis,
	Bar,
	BarChart,
	Tooltip,
	Legend,
	CartesianGrid,
	ReferenceLine,
} from 'recharts';
import InvestorTradingTable from './InvestorTradingTable';
const records = [
	{
		date: '2024-09-13',
		foreignerPureBuyQuant: 3014,
		foreignerHoldRatio: 30.76,
		organPureBuyQuant: 68278,
		individualPureBuyQuant: -70044,
		accumulatedTradingVolume: 191057,
	},
	{
		date: '2024-09-12',
		foreignerPureBuyQuant: 57626,
		foreignerHoldRatio: 30.76,
		organPureBuyQuant: -46520,
		individualPureBuyQuant: -13038,
		accumulatedTradingVolume: 314290,
	},
	{
		date: '2024-09-11',
		foreignerPureBuyQuant: 13976,
		foreignerHoldRatio: 30.69,
		organPureBuyQuant: -69392,
		individualPureBuyQuant: 43807,
		accumulatedTradingVolume: 364283,
	},
	{
		date: '2024-09-10',
		foreignerPureBuyQuant: 13368,
		foreignerHoldRatio: 30.8,
		organPureBuyQuant: -329,
		individualPureBuyQuant: -13116,
		accumulatedTradingVolume: 191065,
	},
	{
		date: '2024-09-09',
		foreignerPureBuyQuant: 34754,
		foreignerHoldRatio: 30.79,
		organPureBuyQuant: 10764,
		individualPureBuyQuant: -45980,
		accumulatedTradingVolume: 263324,
	},
];

const InvestorTradingWidget = ({}) => {
	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '15px',
				borderRadius: '10px',
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			<SubTitle text="투자자별 매매 동향" caption="단위: 수량 (주)" />
			<Stack
				direction="column"
				sx={{
					justifyContent: 'flex-start',
					width: '100%',
					height: '100%',
				}}
				spacing={1}>
				<Box sx={{ width: '100%', height: '450px' }}>
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							width={500}
							height={300}
							data={records}
							margin={{
								top: 15,
								bottom: 5,
							}}
							barCategoryGap="30%"
							style={{ fontSize: '12px' }}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="date" />
							<YAxis />
							<Tooltip />
							<Legend />
							<ReferenceLine y={0} stroke="#000" />
							<Bar
								dataKey="individualPureBuyQuant"
								fill={colors.graph.blue}
								name="개인"
							/>
							<Bar
								dataKey="organPureBuyQuant"
								fill={colors.graph.green}
								name="기관"
							/>
							<Bar
								dataKey="foreignerPureBuyQuant"
								fill={colors.graph.yellow}
								name="외국인"
							/>
						</BarChart>
					</ResponsiveContainer>
				</Box>
				<InvestorTradingTable records={records} />
			</Stack>
		</Stack>
	);
};

export default InvestorTradingWidget;
