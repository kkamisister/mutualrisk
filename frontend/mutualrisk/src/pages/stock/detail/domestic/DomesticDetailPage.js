import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
// import ChartWidget from './ChartWidget';
import { colors } from 'constants/colors';
// import ExchangeRateWidget from './ExchangeRateWidget';
import ChartWidget from './ChartWidget';
// import OverseasInfoTab from './OverseasInfoTab';
import StockNewsTab from '../StockNewsTab';
import StockMenuButton from '../StockMenuButton';
import StockPrice from './StockPrice';
import StockTitle from './StockTitle';

const initialData = [
	{ time: '2018-12-22', value: 32.51 },
	{ time: '2018-12-23', value: 31.11 },
	{ time: '2018-12-24', value: 27.02 },
	{ time: '2018-12-25', value: 27.32 },
	{ time: '2018-12-26', value: 25.17 },
	{ time: '2018-12-27', value: 28.89 },
	{ time: '2018-12-28', value: 25.46 },
	{ time: '2018-12-29', value: 23.92 },
	{ time: '2018-12-30', value: 22.68 },
	{ time: '2018-12-31', value: 22.67 },
];

const DomesticDetailPage = ({ assetInfo }) => {
	const [tabMenu, setTabMenu] = useState('chart');
	const {
		assetId,
		market,
		code,
		name,
		price,
		dailyPriceChange,
		dailyPriceChangeRate,
	} = assetInfo.assets[0];
	const newsList = assetInfo.news;
	const imageUrl = `https://j11a607.p.ssafy.io${assetInfo.assets[0].imagePath}/${assetInfo.assets[0].imageName}`;

	return (
		<Stack sx={{ height: '100%' }} spacing={1}>
			<Stack direction="row" spacing={1}>
				<StockTitle
					name={name}
					code={code}
					market={market}
					imageUrl={imageUrl}
				/>
				<StockPrice
					price={price}
					dailyPriceChange={dailyPriceChange}
					dailyPriceChangeRate={dailyPriceChangeRate}
				/>
			</Stack>

			<Stack
				direction="row"
				spacing={1}
				sx={{
					backgroundColor: colors.background.primary,
					width: 'fit-content',
					borderRadius: '100px',
					border: `1px solid ${colors.point.stroke}`,
				}}>
				<StockMenuButton
					label="차트 · 호가"
					value="chart"
					onChange={setTabMenu}
					selected={tabMenu === 'chart'}
				/>
				<StockMenuButton
					label="종목 정보"
					value="info"
					onChange={setTabMenu}
					selected={tabMenu === 'info'}
				/>
				<StockMenuButton
					label="뉴스 · 공시"
					value="news"
					onChange={setTabMenu}
					selected={tabMenu === 'news'}
				/>
			</Stack>
			{tabMenu === 'chart' && (
				<Box
					sx={{
						height: '700px',
						width: '100%',
						overflow: 'hidden',
						borderRadius: '15px',
						backgroundColor: colors.background.white,
						border: `1px solid ${colors.point.stroke}`,
					}}>
					<ChartWidget assetId={assetId} />
				</Box>
			)}
			{tabMenu === 'info' && (
				<Box
					sx={{
						width: '100%',
					}}>
					{/* <OverseasInfoTab market={market} code={code} /> */}
				</Box>
			)}
			{tabMenu === 'news' && <StockNewsTab newsList={newsList} />}
		</Stack>
	);
};

export default DomesticDetailPage;
