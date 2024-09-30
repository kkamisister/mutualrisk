import React from 'react';
import PortfolioSummaryListItem from 'pages/portfolio/detail/summary/PortfolioSummaryListItem';
import { Stack, Typography, Box } from '@mui/material';
import { colors } from 'constants/colors';
import HorizontalScrollContainer from 'components/scroll/HorizontalScrollContainer';

const PortfolioSummaryList = () => {
	return (
		<HorizontalScrollContainer>
			<Stack direction="row" spacing={1}>
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

				{/* 위험도 박스 */}
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
								width: '30px', // 동그라미 크기 설정
								height: '30px',
								borderRadius: '50%', // 동그라미 모양 만들기
								backgroundColor: 'green', // 동그라미 색상 설정
								marginRight: '8px', // Typography와의 간격 설정
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
								width: '30px', // 동그라미 크기 설정
								height: '30px',
								borderRadius: '50%', // 동그라미 모양 만들기
								backgroundColor: 'green', // 동그라미 색상 설정
								marginRight: '8px', // Typography와의 간격 설정
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
								width: '30px', // 동그라미 크기 설정
								height: '30px',
								borderRadius: '50%', // 동그라미 모양 만들기
								backgroundColor: 'green', // 동그라미 색상 설정
								marginRight: '8px', // Typography와의 간격 설정
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
								width: '30px', // 동그라미 크기 설정
								height: '30px',
								borderRadius: '50%', // 동그라미 모양 만들기
								backgroundColor: 'green', // 동그라미 색상 설정
								marginRight: '8px', // Typography와의 간격 설정
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
			</Stack>
		</HorizontalScrollContainer>
	);
};

export default PortfolioSummaryList;
