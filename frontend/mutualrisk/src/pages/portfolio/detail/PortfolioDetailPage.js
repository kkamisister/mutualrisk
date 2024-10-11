import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import TitleDivider from 'components/title/TitleDivider';
import Title from 'components/title/Title';
import Select from 'react-select';
import { Stack } from '@mui/material';
import { colors } from 'constants/colors';
import StockAddBox from 'pages/portfolio/detail/StockAddBox';
import PortfolioSummaryList from 'pages/portfolio/detail/summary/PortfolioSummaryList';
import AssetRatio from 'pages/portfolio/detail/asset/AssetRatio';
import EfficientFrontier from 'pages/portfolio/detail/graph/EfficientFrontier';
import BackTesting from 'pages/portfolio/detail/graph/BackTesting';
import EquitySectors from 'pages/portfolio/detail/graph/EquitySectors';
import MonthlyReturns from 'pages/portfolio/detail/graph/MonthlyReturns';
import WidgetContainer from 'components/container/WidgetConatiner';
import {
	fetchPortfolioList,
	fetchPortfolioByPorfolioId,
} from 'utils/apis/analyze';

const formatDate = dateString => {
	const date = new Date(dateString);
	return date
		.toLocaleDateString('ko-KR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		})
		.replace(/\.$/, '');
};

const PortfolioDetailPage = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [selectedPortfolio, setSelectedPortfolio] = React.useState(null);
	const [latestPortfolioId, setLatestPortfolioId] = React.useState(null); // 최신 포트폴리오 id 저장

	const {
		data: portfolioListData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['portfolioList'],
		queryFn: fetchPortfolioList,
	});

	const { data: latestPortfolioData } = useQuery({
		queryKey: ['latestPortfolio', latestPortfolioId],
		queryFn: () => fetchPortfolioByPorfolioId(latestPortfolioId),
		enabled: !!latestPortfolioId, // 최신 포트폴리오 id가 설정되면 쿼리 실행
	});

	const { data: portfolioData } = useQuery({
		queryKey: ['portfolioDetail', selectedPortfolio?.value],
		queryFn: () => fetchPortfolioByPorfolioId(selectedPortfolio?.value),
		enabled: !!selectedPortfolio, // 선택된 포트폴리오가 있을 때만 실행
	});

	React.useEffect(() => {
		if (portfolioListData && !portfolioListData.hasPortfolio) {
			navigate('/portfolio/create');
		} else if (
			portfolioListData &&
			portfolioListData.portfolioList.length > 0
		) {
			const latestPortfolio = portfolioListData.portfolioList[0];
			setLatestPortfolioId(latestPortfolio.id); // 최신 포트폴리오 id 설정

			if (!selectedPortfolio) {
				setSelectedPortfolio({
					value: latestPortfolio.id,
					label: latestPortfolio.name,
					version: latestPortfolio.version,
					createdAt: latestPortfolio.createdAt,
				});

				// 최신 포트폴리오의 id와 version을 캐싱합니다.
				queryClient.setQueryData('latestPortfolio', {
					portfolioId: latestPortfolio.id,
					version: latestPortfolio.version,
				});
			}
		}
	}, [portfolioListData, navigate, selectedPortfolio, queryClient]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error fetching portfolio list.</div>;
	}

	const portfolioOptions = portfolioListData.portfolioList.map(portfolio => ({
		value: portfolio.id,
		label: portfolio.name,
		version: portfolio.version,
		createdAt: portfolio.createdAt,
	}));

	const CustomOption = ({ data, innerRef, innerProps }) => (
		<div ref={innerRef} {...innerProps} style={{ padding: '10px' }}>
			<span>{data.label}</span>
			<br />
			<span style={{ color: '#999', fontSize: '12px' }}>
				생성일: {formatDate(data.createdAt)}
			</span>
		</div>
	);

	return (
		<Stack spacing={2}>
			{/* StockAddBox에 항상 최신 포트폴리오의 추천 종목 전달 */}
			{latestPortfolioData &&
				latestPortfolioData.portfolio.recommendAssets && (
					<StockAddBox
						recommendAssets={
							latestPortfolioData.portfolio.recommendAssets
						}
					/>
				)}
			<TitleDivider text="내 포트폴리오" />

			<Select
				options={portfolioOptions}
				placeholder="포트폴리오 선택"
				value={selectedPortfolio}
				onChange={setSelectedPortfolio}
				components={{ Option: CustomOption }}
			/>

			{selectedPortfolio && (
				<>
					<WidgetContainer
						sx={{ backgroundColor: colors.main.primary100 }}>
						<Title text="포트폴리오 현황 요약" />
						<PortfolioSummaryList ver={selectedPortfolio.version} />
					</WidgetContainer>
					<AssetRatio portfolioId={selectedPortfolio.value} />
					<EfficientFrontier portfolioId={selectedPortfolio.value} />
					<BackTesting portfolioId={selectedPortfolio.value} />
					<EquitySectors portfolioId={selectedPortfolio.value} />
					<MonthlyReturns portfolioId={selectedPortfolio.value} />
				</>
			)}
		</Stack>
	);
};

export default PortfolioDetailPage;
