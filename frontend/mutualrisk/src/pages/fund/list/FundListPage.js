import React from 'react';
import DashboardLayout from 'layouts/DashboardLayout';
import FundManagerList from 'pages/fund/list/FundManagerList';
import BoxTitle from 'components/title/BoxTitle';
import { Box, Divider, Stack } from '@mui/material';

const FundListPage = () => {
	return (
		<DashboardLayout>
			<Stack spacing={1}>
				<BoxTitle title="상위 20개 투자운용사 목록" />
				<FundManagerList />
			</Stack>
		</DashboardLayout>
	);
};

export default FundListPage;
