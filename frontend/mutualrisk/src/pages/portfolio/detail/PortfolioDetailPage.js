import React from 'react';
import { useQuery } from '@tanstack/react-query';
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
import { fetchPortfolioList } from 'utils/apis/analyze';

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
	const [selectedPortfolio, setSelectedPortfolio] = React.useState(null);

	const { data, isLoading, isError } = useQuery({
		queryKey: ['portfolioList'],
		queryFn: fetchPortfolioList,
	});

	React.useEffect(() => {
		if (data && !data.hasPortfolio) {
			navigate('/');
		} else if (data && data.portfolioList.length > 0) {
			const latestPortfolio = data.portfolioList[0];

			if (!selectedPortfolio) {
				setSelectedPortfolio({
					value: latestPortfolio.id,
					label: latestPortfolio.name,
					version: latestPortfolio.version,
					createdAt: latestPortfolio.createdAt,
				});
			}
		}
	}, [data, navigate, selectedPortfolio]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error fetching portfolio list.</div>;
	}

	const portfolioOptions = data.portfolioList.map(portfolio => ({
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
		<Stack spacing={2} sx={{ backgroundColor: colors.background.primary }}>
			<StockAddBox />
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
