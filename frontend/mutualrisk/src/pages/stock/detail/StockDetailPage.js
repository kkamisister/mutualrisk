import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import TradingViewWidget from './TradingViewWidget';
import StockNewsList from './StockNewsList';
import StockInfoSummary from './StockInfoSummary';
import TitleDivider from 'components/title/TitleDivider';
import { colors } from 'constants/colors';
import Button from '@mui/material/Button';
import ExchangeRateWidget from './ExchangeRateWidget';
import StockPrice from './StockPrice';

const StockMenuButton = ({ label, value, disabled, onChange, selected }) => {
	return (
		<Button
			sx={{
				backgroundColor: selected
					? colors.background.white
					: colors.background.primary,
				width: 'fit-content',
				borderRadius: '100px',
				color: colors.text.main,
				paddingLeft: '20px',
				paddingRight: '20px',
				fontWeight: 500,
				fontSize: '13px',
			}}
			disabled={disabled}
			onClick={() => onChange(value)}>
			{label}
		</Button>
	);
};

const StockDetailPage = () => {
	const [tabMenu, setTabMenu] = useState('chart');

	return (
		<Stack sx={{ height: '100%' }} spacing={1}>
			<TitleDivider text="주식 상세 정보" />
			<Stack direction="row" spacing={1}>
				<StockInfoSummary />
				<StockPrice />
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
					disabled
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
					<TradingViewWidget />
				</Box>
			)}
			{tabMenu === 'info' && (
				<Box
					sx={{
						height: '700px',
						width: '100%',
						overflow: 'hidden',
						borderRadius: '15px',
						border: `1px solid ${colors.point.stroke}`,
					}}>
					주식 관련 정보(미확정)
				</Box>
			)}
			{tabMenu === 'news' && <StockNewsList />}
		</Stack>
	);
};

export default StockDetailPage;
