import React from 'react';
import { Stack, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { colors } from 'constants/colors';
import TitleDivider from 'components/title/TitleDivider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FundSummary from 'pages/fund/detail/FundSummary';
import FundInfo from './FundInfo';
import AssetEvaluationChart from './AssetEvaluationChart';
import SectorBias from './SectorBias';
import AssetHoldingList from './AssetHoldingList';
import { useQuery } from '@tanstack/react-query';
import { fetchFundByFundId } from 'utils/apis/fund';

const FundDetailPage = ({ id }) => {
	const { isPending, data } = useQuery({
		queryKey: ['fundDetail'], // keyword를 queryKey에 포함하여 키워드가 변경되면 새로운 요청 실행
		queryFn: () => fetchFundByFundId(id),
	});

	return (
		<Stack
			sx={{
				backgroundColor: colors.background.primary,
			}}>
			<TitleDivider text="워런 버핏의 포트폴리오">
				<Chip
					icon={<AddCircleOutlineIcon />}
					size="small"
					label="내 포트폴리오에 추가하기"
					color="primary"
					sx={{ height: '22px', fontSize: '12px' }}
					onClick={() => {
						console.log('Portfolio Added');
					}}></Chip>
			</TitleDivider>
			<Grid
				container
				sx={{ marginTop: '0px', justifyContent: 'space-between' }}
				rowSpacing={1}>
				<Grid item xs={5.9}>
					<Stack spacing={1}>
						<FundSummary title="펀드 정보 요약" />
						<AssetEvaluationChart title="자산 평가액 변동 기록" />

						<SectorBias title="섹터 편중" />
					</Stack>
				</Grid>
				<Grid item xs={5.9}>
					<Stack spacing={1}>
						<FundInfo title="투자자 정보" />
						<AssetHoldingList title="종목 보유량" />
					</Stack>
				</Grid>
			</Grid>
		</Stack>
	);
};

export default FundDetailPage;
