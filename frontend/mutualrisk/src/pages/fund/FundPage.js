import React from 'react';
import FundManagerList from 'pages/fund/list/FundManagerList';
import { Box, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { colors } from 'constants/colors';
import TitleDivider from 'components/title/TitleDivider';
import { useLocation } from 'react-router-dom';
import FundDetailPage from './detail/FundDetailPage';
import FundListPage from './list/FundListPage';
import { useQuery } from '@tanstack/react-query';
import { fetchFundList } from 'utils/apis/fund';

const FundPage = () => {
	const location = useLocation();
	const { isPending, data } = useQuery({
		queryKey: ['fundList'], // keyword를 queryKey에 포함하여 키워드가 변경되면 새로운 요청 실행
		queryFn: () => fetchFundList(),
	});

	const fundList = data?.funds || [];
	const topHoldAsset = data?.topHoldAndBuyAmount.topHoldAsset || [];
	const topBuyAsset = data?.topHoldAndBuyAmount.topBuyAsset || [];

	return (
		<Stack spacing={2} sx={{}}>
			<Stack spacing={1}>
				<TitleDivider
					text="상위 20개 투자운용사 목록"
					caption="(최근 업데이트: 2024/12/31)"
				/>
				<FundManagerList fundList={fundList} />
			</Stack>
			{location.pathname.startsWith('/fund/list') && (
				<FundListPage
					topHoldAsset={topHoldAsset}
					topBuyAsset={topBuyAsset}
				/>
			)}
			{location.pathname.startsWith('/fund/detail') && <FundDetailPage />}
		</Stack>
	);
};

export default FundPage;
