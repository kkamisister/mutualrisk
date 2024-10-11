import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import { colors } from 'constants/colors';
import ChartWidget from './ChartWidget';
import StockNewsTab from '../StockNewsTab';
import StockMenuButton from '../StockMenuButton';
import StockPrice from './StockPrice';
import StockTitle from './StockTitle';
import StockInfoTab from './stock/StockInfoTab';
import EtfInfoTab from './etf/EtfInfoTab';
import WidgetContainer from 'components/container/WidgetConatiner';
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
		<Stack sx={{ height: '100%', width: '100%' }} spacing={1}>
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
				<WidgetContainer
					sx={{
						height: '700px',
						overflow: 'hidden',
						borderRadius: '15px',
						backgroundColor: colors.background.white,
						border: `1px solid ${colors.point.stroke}`,
					}}>
					<ChartWidget assetId={assetId} />
				</WidgetContainer>
			)}
			{tabMenu === 'info' && (
				<Box
					sx={{
						width: '100%',
					}}>
					{market === 'ETF' && (
						<EtfInfoTab market={market} code={code} assetId={assetId} />
					)}
					{market !== 'ETF' && (
						<StockInfoTab market={market} code={code} assetId={assetId} />
					)}
				</Box>
			)}
			{tabMenu === 'news' && <StockNewsTab newsList={newsList} />}
		</Stack>
	);
};

export default DomesticDetailPage;
