import React, { useEffect } from 'react';
import { Stack, Grid } from '@mui/material';
import { colors } from 'constants/colors';
import TitleDivider from 'components/title/TitleDivider';
import FundSummary from 'pages/fund/detail/FundSummary';
import FundInfo from './FundInfo';
import AssetEvaluationChart from './AssetEvaluationChart';
import SectorBias from './SectorBias';
import AssetHoldingList from './AssetHoldingList';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchFundByFundId } from 'utils/apis/fund';
import { useParams } from 'react-router-dom';

const FundDetailPage = () => {
	const params = useParams();
	const fundId = params.fundId;
	const queryClient = useQueryClient();

	const { isLoading, data } = useQuery({
		queryKey: ['fundDetail'], // keyword를 queryKey에 포함하여 키워드가 변경되면 새로운 요청 실행
		queryFn: () => fetchFundByFundId(fundId),
	});
	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ['fundDetail'] });
	}, [params, queryClient]);
	return data === undefined ? (
		<></>
	) : (
		<Stack sx={{}}>
			<TitleDivider
				text={`${data.fund.company}의 포트폴리오`}></TitleDivider>
			<Grid
				container
				sx={{ marginTop: '0px', justifyContent: 'space-between' }}
				rowSpacing={1}>
				<Grid item xs={5.95}>
					<Stack spacing={1}>
						<FundSummary title="펀드 정보 요약" data={data.fund} />
						<AssetEvaluationChart
							title="분기별 수익률 기록"
							company={data.fund.company}
						/>
						<SectorBias title="섹터 편중" data={data} />
					</Stack>
				</Grid>
				<Grid item xs={5.95}>
					<Stack spacing={1}>
						<FundInfo title="투자자 정보" data={data.fund} />
						<AssetHoldingList
							title="종목 보유량"
							data={data.fund.asset}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Stack>
	);
};

export default FundDetailPage;
