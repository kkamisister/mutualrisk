import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import ChartWidget from './ChartWidget';
import { colors } from 'constants/colors';
import ExchangeRateWidget from './ExchangeRateWidget';
import SymbolInfoWidget from './SymbolInfoWidget';
import OverseasInfoTab from './OverseasInfoTab';
import StockNewsTab from '../StockNewsTab';
import StockMenuButton from '../StockMenuButton';

const OverseasDetailPage = ({ assetInfo }) => {
	const [tabMenu, setTabMenu] = useState('chart');
	const market = assetInfo.assets[0].market;
	const code = assetInfo.assets[0].code;
	return (
		<Stack sx={{ height: '100%' }} spacing={1}>
			<Stack direction="row" spacing={1}>
				<SymbolInfoWidget market={market} code={code} />
				<ExchangeRateWidget />
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
					<ChartWidget market={market} code={code} />
				</Box>
			)}
			{tabMenu === 'info' && (
				<Box
					sx={{
						width: '100%',
					}}>
					<OverseasInfoTab market={market} code={code} />
				</Box>
			)}
			{tabMenu === 'news' && <StockNewsTab newsList={assetInfo.news} />}
		</Stack>
	);
};

export default OverseasDetailPage;
