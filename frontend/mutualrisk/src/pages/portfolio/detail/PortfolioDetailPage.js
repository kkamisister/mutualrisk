import React from 'react';
import BoxTitle from 'components/title/BoxTitle';
import TitleDivider from 'components/title/TitleDivider';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import StockAddBox from 'pages/portfolio/detail/StockAddBox';
import PortfolioSummaryListItem from 'pages/portfolio/detail/summary/PortfolioSummaryListItem';
import AssetRatio from 'pages/portfolio/detail/asset/AssetRatio';

const PortfolioDetailPage = () => {
	return (
		<Stack spacing={6} sx={{ backgroundColor: colors.background.primary }}>
			<StockAddBox />
			<Stack spacing={1}>
				<TitleDivider
					text="포트폴리오 현황 요약"
					caption="(최근 업데이트: 2024/12/31)"
				/>
				<Stack direction="row" spacing={1} sx={{ marginTop: '20px' }}>
					{/* 위험도 박스 */}
					<PortfolioSummaryListItem title="위험도">
						<Box
							sx={{
								display: 'flex', // Flexbox 사용
								justifyContent: 'center', // 가로 중앙 정렬
								alignItems: 'center', // 세로 중앙 정렬
								// height: '100%', // 부모 요소의 높이를 전부 차지하도록 설정
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
				</Stack>
			</Stack>
			<Stack spacing={1}>
				<BoxTitle title="보유 자산 비율" />
				<AssetRatio></AssetRatio>
			</Stack>
			<Stack spacing={1}>
				<BoxTitle title="그래프1" />
			</Stack>
			<Stack spacing={1}>
				<BoxTitle title="그래프2" />
			</Stack>
		</Stack>
	);
};

export default PortfolioDetailPage;
