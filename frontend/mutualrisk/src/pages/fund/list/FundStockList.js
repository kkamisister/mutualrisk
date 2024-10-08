import React from 'react';
import { Stack } from '@mui/material';
import FundStockListItem from './FundStockListItem';
import { colors } from 'constants/colors';
import FundStockBarChart from 'pages/fund/list/FundStockBarChart';
import Title from 'components/title/Title';

const FundStockList = ({ title, data, dataName, dataKey }) => {
	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '20px',
				borderRadius: '20px',
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			<Title text={title} caption="(단위: 10만 달러)"></Title>
			<FundStockBarChart data={data} dataName={dataName} dataKey={dataKey} />
			{data.map((asset, idx) => (
				<FundStockListItem
					key={asset.assetId}
					assetId={asset.assetId}
					code={asset.code}
					name={asset.name}
					region={asset.region}
					market={asset.market}
					mvRank={asset.rank}
					rank={idx + 1}
					valueOfHolding={asset.valueOfHolding}
					currentValue={asset.currentValue}
					bookmark={asset.interest}
				/>
			))}
		</Stack>
	);
};

export default FundStockList;
