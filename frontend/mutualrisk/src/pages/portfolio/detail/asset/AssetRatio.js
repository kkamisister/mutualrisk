import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import AssetRatioPieChart from 'pages/portfolio/detail/asset/AssetRatioPieChart';
import AssetList from 'pages/portfolio/detail/asset/AssetList';
import { colors } from 'constants/colors';
import Title from 'components/title/Title';
import { fetchPortfolioByPorfolioId } from 'utils/apis/analyze';

const AssetRatio = ({ portfolioId }) => {
	// hover된 자산 인덱스를 상태로 관리
	const [hoveredAssetIndex, setHoveredAssetIndex] = useState(null);

	// react-query로 API 데이터 가져오기
	const { data, isLoading, isError } = useQuery({
		queryKey: ['portfolioDetail', portfolioId],
		queryFn: () => fetchPortfolioByPorfolioId(portfolioId),
		enabled: !!portfolioId, // portfolioId가 있을 때만 요청 보내기
	});

	// 로딩 중일 때 표시
	if (isLoading) {
		return <Typography>Loading...</Typography>;
	}

	// 에러가 발생했을 때 표시
	if (isError) {
		return <Typography>Error loading portfolio data.</Typography>;
	}

	// 데이터가 없을 경우 처리
	if (!data || !data.portfolio) {
		return <Typography>No portfolio data found.</Typography>;
	}

	const { assets } = data.portfolio;

	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '20px',
				borderRadius: '20px',
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			<Title text={'보유 자산 비율'} />
			<Stack
				spacing={2}
				direction="row"
				sx={{
					width: '100%',
					height: '100%',
					maxHeight: '100%',
					display: 'flex',
					justifyContent: 'space-evenly',
					alignItems: 'center',
					flexWrap: 'nowrap',
				}}>
				{/* AssetRatioPieChart에 hover 인덱스를 전달하는 콜백 추가 */}
				<AssetRatioPieChart
					sx={{ flex: 1 }}
					assets={assets}
					onHover={setHoveredAssetIndex} // hover된 종목 인덱스를 설정
				/>

				{/* AssetList에 hover된 인덱스를 전달 */}
				<AssetList
					sx={{ flex: 1 }}
					assets={assets}
					hoveredIndex={hoveredAssetIndex}
				/>
			</Stack>
		</Stack>
	);
};

export default AssetRatio;
