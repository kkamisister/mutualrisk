import React from 'react';
import { Box, Stack, Avatar } from '@mui/material';
import { colors } from 'constants/colors';
import SubTitle from 'components/title/SubTitle';
import {
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Bar,
	ResponsiveContainer,
} from 'recharts';
import FundStockListItem from './FundStockListItem';
const AssetHoldingList = ({ title, data }) => {
	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '15px',
				borderRadius: '10px',
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			<SubTitle text={title} />
			<Stack>
				<Box sx={{ fontSize: '12px' }} height="250px" width="100%">
					<ResponsiveContainer>
						<BarChart data={data}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="code" />
							<YAxis />
							<Tooltip />
							<Bar
								name="보유 비율"
								dataKey="valueOfHoldingRatio"
								fill={colors.main.primary300}
							/>
						</BarChart>
					</ResponsiveContainer>
				</Box>
				<Stack spacing={1.5}>
					{data.map((asset, idx) => (
						<FundStockListItem
							assetId={asset.assetId}
							code={asset.code}
							name={asset.name}
							region={asset.region}
							market={asset.market}
							mvRank={asset.rank}
							rank={idx + 1}
							valueOfHolding={asset.valueOfHolding}
							valueOfHoldingRatio={asset.valueOfHoldingRatio}
							bookmark={asset.interest}
						/>
					))}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AssetHoldingList;
