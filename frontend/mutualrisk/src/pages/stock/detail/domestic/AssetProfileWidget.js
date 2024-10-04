import React from 'react';
import { Stack, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import SubTitle from 'components/title/SubTitle';
import WidgetContainer from 'components/container/WidgetConatiner';

const AssetProfileWidget = ({ market, data }) => {
	return (
		<WidgetContainer>
			<SubTitle text={data.name} caption={`(${market} · ${data.code})`} />
			<Typography color={colors.text.sub1} fontSize={16}>
				{data.summary}
			</Typography>
		</WidgetContainer>
	);
};

export default AssetProfileWidget;
