import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PortfolioSummaryListItem from 'pages/portfolio/detail/summary/PortfolioSummaryListItem';
import { Stack, Typography, Box, Tooltip } from '@mui/material';
import { colors } from 'constants/colors';
import HorizontalScrollContainer from 'components/scroll/HorizontalScrollContainer';
import { fetchPortfolioSummaryByVer } from 'utils/apis/analyze';
import { InfoOutlined } from '@mui/icons-material';
import { useEffect } from 'react';

const DescriptionTooltip = ({ title, description }) => {
	return (
		<Box>
			<Stack spacing={0.5}>
				<Typography color={colors.text.main} fontSize="14px">
					{title}
				</Typography>
				<Typography color={colors.text.sub1} fontSize="12px">
					{description}
				</Typography>
			</Stack>
		</Box>
	);
};

// 위험도 박스를 렌더링하는 함수
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
		<PortfolioSummaryListItem title={title}>
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
					sx={{
						fontSize: '14px',
						color: 'gray',
						fontWeight: 'bold',
					}}>
					상위 {percentage.toFixed(2)}%
				</Typography>
				<Stack direction={'row'} justifyContent={'center'}>
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
						sx={{
							fontSize: '18px',
							color: color,
							fontWeight: 'bold',
						}}>
						{text}
					</Typography>
				</Stack>
			</Stack>
		</PortfolioSummaryListItem>
	);
};

const PortfolioSummaryList = ({ ver }) => {
	const { data, isError } = useQuery({
		queryKey: ['portfolioSummary', ver],
		queryFn: () => fetchPortfolioSummaryByVer(ver),
	});

	React.useEffect(() => {
		console.log('PortfolioSummary received version:', ver);
	}, [ver]);

	React.useEffect(() => {
		if (data) {
			console.log('Portfolio Summary Data:', data);
		}
	}, [data]);

	if (isError || !data) {
		// return <div>Error loading portfolio summary.</div>;
		return <div></div>;
	}

	const {
		curValuation,
		lastValuation,
		initValuation,
		sharpeRatio,
		krxSharpeRatio,
		krxETFSharpeRatio,
		nasdaqSharpeRatio,
		nasdaqETFSharpeRatio,
	} = data;

	return (
		<HorizontalScrollContainer>
			<Stack direction="row" spacing={1}>
				{/* 평가 금액 박스 */}
				<PortfolioSummaryListItem title="평가 금액">
					<Typography
						sx={{
							fontSize: '20px',
							fontWeight: 'bold',
							color: colors.text.sub1,
						}}>
						{Math.trunc(curValuation).toLocaleString()}원
					</Typography>
				</PortfolioSummaryListItem>

				{/* 예상 수익률 박스 */}
				<PortfolioSummaryListItem title="예상 수익률">
					<Typography sx={{ lineHeight: '1.2' }}>
						{lastValuation !== null && (
							<>
								<span style={{ fontSize: '10px', color: 'gray' }}>
									현재 가치 기준
								</span>
								<br />
							</>
						)}
						<span
							style={{
								fontSize: '18px',
								fontWeight: 'bold',
								color:
									curValuation - initValuation > 0 ? 'red' : 'blue',
								marginRight: '3px',
							}}>
							{curValuation - initValuation > 0 ? '+' : ''}
							{Math.trunc(curValuation - initValuation).toLocaleString()}
							원 ({curValuation - initValuation > 0 ? '+' : ''}
							{(
								((curValuation - initValuation) / initValuation) *
								100
							).toFixed(1)}
							%)
						</span>
					</Typography>
				</PortfolioSummaryListItem>

				{/* 예상 수익률 박스 */}
				{lastValuation !== null && (
					<PortfolioSummaryListItem title="예상 수익률">
						<Typography sx={{ lineHeight: '1.2' }}>
							<span style={{ fontSize: '10px', color: 'gray' }}>
								매도 가치 기준
							</span>
							<br />
							<span
								style={{
									fontSize: '18px',
									fontWeight: 'bold',
									color:
										lastValuation - initValuation > 0
											? 'red'
											: 'blue',
									marginRight: '3px',
								}}>
								{lastValuation - initValuation > 0 ? '+' : ''}
								{(lastValuation - initValuation).toLocaleString()}원 (
								{lastValuation - initValuation > 0 ? '+' : ''}
								{(
									((lastValuation - initValuation) / initValuation) *
									100
								).toFixed(1)}
								%)
							</span>
						</Typography>
					</PortfolioSummaryListItem>
				)}

				{/* 위험률 대비 수익률 박스 */}
				<PortfolioSummaryListItem title="샤프 비율">
					<Typography
						sx={{
							fontSize: '20px',
							fontWeight: 'bold',
							color: colors.text.sub1,
							display: 'flex',
							alignItems: 'center',
						}}>
						{sharpeRatio.toFixed(2)}{' '}
						<Tooltip
							componentsProps={{
								tooltip: {
									sx: {
										padding: '15px',
										backgroundColor: colors.background.white,
										boxShadow:
											'0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
										fontSize: 14,
										color: colors.text.sub1,
									},
								},
							}}
							title={
								<DescriptionTooltip
									title="샤프 비율"
									description="기대 수익률을 수익률의 표준편차로 나눈 값을 의미해요. 샤프 비율이 높을수록, 같은 위험 하에서 더 높은 수익률을 기대할 수 있어요."
								/>
							}>
							<InfoOutlined
								sx={{
									fontSize: '16px',
									marginLeft: '5px',
								}}
							/>
						</Tooltip>
					</Typography>
				</PortfolioSummaryListItem>

				{/* 위험도 박스들 */}
				{renderRiskBox(
					krxSharpeRatio.rank,
					krxSharpeRatio.total,
					'KRX 대비 위험도'
				)}
				{renderRiskBox(
					krxETFSharpeRatio.rank,
					krxETFSharpeRatio.total,
					'KRX ETF 대비 위험도'
				)}
				{renderRiskBox(
					nasdaqSharpeRatio.rank,
					nasdaqSharpeRatio.total,
					'NASDAQ 대비 위험도'
				)}
				{renderRiskBox(
					nasdaqETFSharpeRatio.rank,
					nasdaqETFSharpeRatio.total,
					'NASDAQ ETF 대비 위험도'
				)}
			</Stack>
		</HorizontalScrollContainer>
	);
};

export default PortfolioSummaryList;
