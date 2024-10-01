import React from 'react';
import { Box, Stack, Typography, Grid } from '@mui/material';
import { colors } from 'constants/colors';
import PortfolioSummaryListItem from 'pages/portfolio/detail/summary/PortfolioSummaryListItem';

const PortfolioSummary = () => {
	return (
		<Stack
			sx={{
				width: '450px',
				overflow: 'hidden',
			}}>
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					overflowY: 'auto',
					scrollbarWidth: 'none',
					'& .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar':
						{
							display: 'none',
						},
					'& .react-horizontal-scrolling-menu--scroll-container': {
						scrollbarWidth: 'none',
						'-ms-overflow-style': 'none',
					},
				}}>
				<Grid container spacing={1} sx={{ marginTop: '20px' }}>
					<Grid item xs={6}>
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
					</Grid>

					<Grid item xs={6}>
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
					</Grid>

					<Grid item xs={6}>
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
					</Grid>

					<Grid item xs={6}>
						<PortfolioSummaryListItem title="국내채권 대비 위험도">
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
								}}>
								<Box
									sx={{
										width: '30px',
										height: '30px',
										borderRadius: '50%',
										backgroundColor: 'green',
										marginRight: '8px',
									}}
								/>
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
					</Grid>

					<Grid item xs={6}>
						<PortfolioSummaryListItem title="해외채권 대비 위험도">
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
								}}>
								<Box
									sx={{
										width: '30px',
										height: '30px',
										borderRadius: '50%',
										backgroundColor: 'green',
										marginRight: '8px',
									}}
								/>
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
					</Grid>

					<Grid item xs={6}>
						<PortfolioSummaryListItem title="S&P 대비 위험도">
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
								}}>
								<Box
									sx={{
										width: '30px',
										height: '30px',
										borderRadius: '50%',
										backgroundColor: 'green',
										marginRight: '8px',
									}}
								/>
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
					</Grid>

					<Grid item xs={6}>
						<PortfolioSummaryListItem title="코스피 대비 위험도">
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
								}}>
								<Box
									sx={{
										width: '30px',
										height: '30px',
										borderRadius: '50%',
										backgroundColor: 'green',
										marginRight: '8px',
									}}
								/>
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
					</Grid>
				</Grid>
			</Box>
		</Stack>
	);
};

export default PortfolioSummary;
