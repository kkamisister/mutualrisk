import React from 'react';
import { Stack, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import SubTitle from 'components/title/SubTitle';

const StockProfileWidget = ({ market, data }) => {
	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '20px',
				borderRadius: '10px',
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			<SubTitle text={data.name} caption={`(${market} · ${data.code})`} />
			<Typography color={colors.text.sub1} fontSize={16}>
				{data.summary}
			</Typography>
		</Stack>
	);
};

export default StockProfileWidget;
