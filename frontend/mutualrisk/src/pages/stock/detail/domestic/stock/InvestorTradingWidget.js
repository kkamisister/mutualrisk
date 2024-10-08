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

const InvestorTradingWidget = ({ records }) => {
	const normalizeRecords = records.map(record => {
		return { ...record, date: record.date.slice(0, 6) };
	});
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
				<InvestorTradingTable records={normalizeRecords} />
			</Stack>
		</Stack>
	);
};

export default InvestorTradingWidget;
