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

// 날짜 포맷
const formatDate = dateString => {
	const date = new Date(dateString);
	return date.toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
};

const PortfolioDetailPage = () => {
	const navigate = useNavigate();

	const { data, isLoading, isError } = useQuery({
		queryKey: ['portfolioList'],
		queryFn: fetchPortfolioList,
	});

	// 로딩중
	if (isLoading) {
		return <div>Loading...</div>;
	}

	// 에러 처리
	if (isError) {
		return <div>Error fetching portfolio list.</div>;
	}

	const { hasPortfolio, portfolioList } = data;

	// 포트폴리오가 없을 경우 리다이렉트 어데로???
	if (!hasPortfolio) {
		navigate('/');
		return null;
	}

	const portfolioOptions = portfolioList.map(portfolio => ({
		value: portfolio.id,
		label: portfolio.name,
		createdAt: portfolio.createdAt,
	}));

	// Select 커스텀
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
				onChange={selectedOption => {
					console.log(selectedOption.value); // 선택한 포트폴리오 ID
				}}
				components={{ Option: CustomOption }}
			/>

			<WidgetContainer sx={{ backgroundColor: colors.main.primary100 }}>
				<Title
					text="포트폴리오 현황 요약"
					caption="(최근 업데이트: 2024/12/31)"
				/>
				<PortfolioSummaryList />
			</WidgetContainer>
			<AssetRatio />
			<EfficientFrontier />
			<BackTesting />
			<EquitySectors />
			<MonthlyReturns />
		</Stack>
	);
};

export default PortfolioDetailPage;
