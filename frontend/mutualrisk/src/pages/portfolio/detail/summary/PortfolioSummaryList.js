import React from 'react';
import PortfolioSummaryListItem from 'pages/portfolio/detail/summary/PortfolioSummaryListItem';
import { Stack, Typography, Box } from '@mui/material';
import { colors } from 'constants/colors';

const PortfolioSummaryList = () => {
	return (
		<Stack spacing={2}>
			<Stack direction="row" spacing={1} sx={{ marginTop: '20px' }}>
				{/* 위험도 박스 */}
				<PortfolioSummaryListItem title="위험도">
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<Typography
							sx={{
								fontSize: '18px',
								color: 'green',
								fontWeight: 'bold',
							}}>
							안정
						</Typography>
					</Box>
				</PortfolioSummaryListItem>

				{/* 평가 금액 박스 */}
				<PortfolioSummaryListItem title="평가 금액">
					<Typography
						sx={{
							fontSize: '18px',
							fontWeight: 'bold',
							color: colors.text.sub1,
						}}>
						4,070,000원
					</Typography>
					<Typography sx={{ fontSize: '14px', color: 'red' }}>
						370,000원 (10%)
					</Typography>
				</PortfolioSummaryListItem>

				{/* 예상 수익률 박스 */}
				<PortfolioSummaryListItem title="예상 수익률">
					<Typography
						sx={{
							fontSize: '18px',
							fontWeight: 'bold',
							color: 'red',
						}}>
						370,000원 (10%)
					</Typography>
				</PortfolioSummaryListItem>

				{/* 위험률 대비 수익률 박스 */}
				<PortfolioSummaryListItem title="위험률 대비 수익률">
					<Typography
						sx={{
							fontSize: '18px',
							fontWeight: 'bold',
							color: colors.text.sub1,
						}}>
						16.3%
					</Typography>
				</PortfolioSummaryListItem>
				<PortfolioSummaryListItem />
				<PortfolioSummaryListItem />
				<PortfolioSummaryListItem />
				<PortfolioSummaryListItem />
			</Stack>
		</Stack>
	);
};

export default PortfolioSummaryList;
