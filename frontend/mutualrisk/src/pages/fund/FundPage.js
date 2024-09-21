import React from 'react';
import FundManagerList from 'pages/fund/list/FundManagerList';
import { Box, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { colors } from 'constants/colors';
import TitleDivider from 'components/title/TitleDivider';
import { useLocation } from 'react-router-dom';
import FundDetailPage from './detail/FundDetailPage';
import FundListPage from './list/FundListPage';

const FundPage = () => {
	const location = useLocation();

	return (
		<Stack spacing={2} sx={{ backgroundColor: colors.background.primary }}>
			<Stack spacing={1}>
				<TitleDivider
					text="상위 20개 투자운용사 목록"
					caption="(최근 업데이트: 2024/12/31)"
				/>
				<FundManagerList />
			</Stack>
			{location.pathname.startsWith('/fund/list') && <FundListPage />}
			{location.pathname.startsWith('/fund/detail') && <FundDetailPage />}
		</Stack>
	);
};

export default FundPage;
