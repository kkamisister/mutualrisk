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
	const [selectedPortfolio, setSelectedPortfolio] = React.useState(null);
	const [isSelected, setIsSelected] = React.useState(false);

	const { data, isLoading, isError } = useQuery({
		queryKey: ['portfolioList'],
		queryFn: fetchPortfolioList,
	});

	// 포트폴리오가 없는 경우 리다이렉트 (현재 home으로. 수정 필요)
	React.useEffect(() => {
		if (data && !data.hasPortfolio) {
			navigate('/');
		} else if (data && data.portfolioList.length > 0) {
			// 가장 최근 포트폴리오를 기본 선택으로 설정 (isSelected가 false일 때만)
			if (!isSelected) {
				setSelectedPortfolio(data.portfolioList[0]);
			}
		}
	}, [data, navigate, isSelected]);

	// 로딩 중
	if (isLoading) {
		return <div>Loading...</div>;
	}

	// 에러 처리
	if (isError) {
		return <div>Error fetching portfolio list.</div>;
	}

	// 포트폴리오 선택 옵션
	const portfolioOptions = data.portfolioList.map(portfolio => ({
		value: portfolio.id,
		label: portfolio.name,
		createdAt: portfolio.createdAt,
	}));

	// select 커스텀
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
				value={isSelected ? selectedPortfolio : null} // 선택 전까지는 null로 설정
				onChange={selectedOption => {
					console.log('Selected Portfolio:', selectedOption); // 선택된 포트폴리오 값을 콘솔에 출력
					setSelectedPortfolio(selectedOption);
					setIsSelected(true); // 포트폴리오가 선택된 상태로 변경
				}}
				components={{ Option: CustomOption }}
			/>

			{/* 선택된 포트폴리오 정보를 하위 컴포넌트에 전달 */}
			{selectedPortfolio && (
				<>
					<WidgetContainer
						sx={{ backgroundColor: colors.main.primary100 }}>
						<Title
							text="포트폴리오 현황 요약"
							caption={`(최근 업데이트: ${formatDate(
								selectedPortfolio.createdAt
							)})`}
						/>
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
