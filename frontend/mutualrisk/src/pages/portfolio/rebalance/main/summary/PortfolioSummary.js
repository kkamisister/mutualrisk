import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Stack, Typography, Box, Grid } from '@mui/material';
import { colors } from 'constants/colors';
import PortfolioSummaryListItem from 'pages/portfolio/detail/summary/PortfolioSummaryListItem';
import { fetchPortfolioSummaryByVer } from 'utils/apis/analyze';

const renderRiskBox = (rank, total, title) => {
	const percentage = (rank / total) * 100;
	let color = 'green';
	let text = '안전';

	if (percentage >= 33 && percentage < 67) {
		color = 'orange';
		text = '주의';
	} else if (percentage >= 67) {
		color = 'red';
		text = '위험';
	}

	return (
		<PortfolioSummaryListItem title={title} sx={{ height: '85px' }}>
			<Stack
				spacing={0.5}
				direction="column"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
				}}>
				<Typography
					sx={{ fontSize: '14px', color: 'gray', fontWeight: 'bold' }}>
					상위 {percentage.toFixed(2)}%
				</Typography>
				<Stack direction="row" justifyContent="center">
					<Box
						sx={{
							width: '30px',
							height: '30px',
							borderRadius: '50%',
							backgroundColor: color,
							marginRight: '8px',
						}}
					/>
					<Typography
						sx={{ fontSize: '18px', color: color, fontWeight: 'bold' }}>
						{text}
					</Typography>
				</Stack>
			</Stack>
		</PortfolioSummaryListItem>
	);
};

const PortfolioSummary = ({ version }) => {
	const { data, isError, isLoading } = useQuery({
		queryKey: ['portfolioSummary', version],
		queryFn: () => fetchPortfolioSummaryByVer(version),
		enabled: !!version,
		staleTime: 300000,
		refetchOnWindowFocus: false,
	});

	if (isLoading) return <div>Loading...</div>;
	// if (isError || !data) return <div>Error loading portfolio summary.</div>;
	if (isError || !data) return <div></div>;

	const {
		curValuation,
		initValuation,
		sharpeRatio,
		krxSharpeRatio,
		krxETFSharpeRatio,
		nasdaqSharpeRatio,
		nasdaqETFSharpeRatio,
	} = data;

	return (
		<Stack sx={{ width: '450px', overflow: 'hidden' }}>
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					overflowY: 'auto',
					scrollbarWidth: 'none',
				}}>
				<Grid container spacing={1} sx={{ marginTop: '20px' }}>
					<Grid item xs={6}>
						<PortfolioSummaryListItem
							title="평가 금액"
							sx={{ height: '85px' }}>
							<Typography
								sx={{
									fontSize: '18px',
									fontWeight: 'bold',
									color: colors.text.sub1,
								}}>
								{curValuation.toLocaleString()}원
							</Typography>
						</PortfolioSummaryListItem>
					</Grid>
					<Grid item xs={6}>
						<PortfolioSummaryListItem
							title="예상 수익률"
							sx={{ height: '85px' }}>
							<Typography
								sx={{
									lineHeight: '1.2',
									fontSize: '15px',
									fontWeight: 'bold',
									color:
										curValuation - initValuation > 0 ? 'red' : 'blue',
								}}>
								{curValuation - initValuation > 0 ? '+' : ''}
								{(curValuation - initValuation).toLocaleString()}원 (
								{curValuation - initValuation > 0 ? '+' : ''}
								{(
									((curValuation - initValuation) / initValuation) *
									100
								).toFixed(1)}
								%)
							</Typography>
						</PortfolioSummaryListItem>
					</Grid>
					<Grid item xs={6}>
						<PortfolioSummaryListItem
							title="위험률 대비 수익률"
							sx={{ height: '85px' }}>
							<Typography
								sx={{
									fontSize: '18px',
									fontWeight: 'bold',
									color: colors.text.sub1,
								}}>
								{sharpeRatio.toFixed(2)}%
							</Typography>
						</PortfolioSummaryListItem>
					</Grid>
					<Grid item xs={6}>
						{renderRiskBox(
							krxSharpeRatio.rank,
							krxSharpeRatio.total,
							'KRX 대비 위험도'
						)}
					</Grid>
					<Grid item xs={6}>
						{renderRiskBox(
							krxETFSharpeRatio.rank,
							krxETFSharpeRatio.total,
							'KRX ETF 대비 위험도'
						)}
					</Grid>
					<Grid item xs={6}>
						{renderRiskBox(
							nasdaqSharpeRatio.rank,
							nasdaqSharpeRatio.total,
							'NASDAQ 대비 위험도'
						)}
					</Grid>
					<Grid item xs={6}>
						{renderRiskBox(
							nasdaqETFSharpeRatio.rank,
							nasdaqETFSharpeRatio.total,
							'NASDAQ ETF 대비 위험도'
						)}
					</Grid>
				</Grid>
			</Box>
		</Stack>
	);
};

export default PortfolioSummary;
