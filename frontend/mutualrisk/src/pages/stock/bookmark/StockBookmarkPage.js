import { useEffect } from 'react';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import TitleDivider from 'components/title/TitleDivider';
import StockBookmarkList from './StockBookmarkList';
import StockNewsList from './StockNewsList';
import { useQuery } from '@tanstack/react-query';
import { fetchBookmarks } from 'libs/api';

const StockBookmarkPage = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['bookmark'], // 새롭게 자산이 추가되면 추가되는 자산 트래킹
		queryFn: () => fetchBookmarks(),
		initialData: {
			assetNum: 0,
			assets: [],
			newsNum: 0,
			news: [],
		},
	});

	return (
		<Grid container sx={{ justifyContent: 'space-between' }}>
			<Grid item xs={4.9}>
				<Stack spacing={1}>
					<TitleDivider text="관심 종목" />
					<StockBookmarkList assetList={data.assets || []} />
				</Stack>
			</Grid>
			<Grid item xs={6.9}>
				<Stack spacing={1}>
					<TitleDivider text="나만의 뉴스" />
					<StockNewsList newsList={data.news || []} />
				</Stack>
			</Grid>
		</Grid>
	);
};

export default StockBookmarkPage;
