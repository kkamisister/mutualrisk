import React from 'react';
import FundManagerList from 'pages/fund/list/FundManagerList';
import BoxTitle from 'components/title/BoxTitle';
import { Box, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { colors } from 'constants/colors';
const PortfolioDetailPage = () => {
	return (
		<Stack spacing={2} sx={{ backgroundColor: colors.background.primary }}>
			<Stack spacing={1}>
				<BoxTitle title="포트폴리오 현황 요약" />
			</Stack>
		</Stack>
	);
};

export default PortfolioDetailPage;
