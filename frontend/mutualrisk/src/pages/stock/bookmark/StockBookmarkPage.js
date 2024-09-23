import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import TitleDivider from 'components/title/TitleDivider';
import StockBookmarkList from './StockBookmarkList';
import StockNewsList from './StockNewsList';
const StockBookmarkPage = () => {
	return (
		<Grid container sx={{ justifyContent: 'space-between' }}>
			<Grid item xs={4.9}>
				<Stack spacing={1}>
					<TitleDivider text="관심 종목" />
					<StockBookmarkList />
				</Stack>
			</Grid>
			<Grid item xs={6.9}>
				<Stack spacing={1}>
					<TitleDivider text="나만의 뉴스" />
					<StockNewsList />
				</Stack>
			</Grid>
		</Grid>
	);
};

export default StockBookmarkPage;
