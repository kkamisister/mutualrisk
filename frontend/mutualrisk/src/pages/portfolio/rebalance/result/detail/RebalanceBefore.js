import React, { useState } from 'react';
import DetailContainer from 'pages/portfolio/rebalance/result/detail/DetailContainer';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { colors } from 'constants/colors';
import PortfolioAssetList from '../../main/piechart/PortfolioAssetList';

// 길이가 긴 문자열을 자르고 말줄임표 붙이는 함수
const truncateString = (str, maxLength) => {
	if (str.length > maxLength) {
		return `${str.slice(0, maxLength)}...`;
	}
	return str;
};

const RebalanceBefore = ({ rebalanceData }) => {
	const [highlightedStockIndex, setHighlightedStockIndex] = useState(null);

	// 기존 포트폴리오 자산 정보
	const oldAssets =
		rebalanceData?.data?.oldPortfolioAssetInfoList?.map(asset => ({
			name: asset.name,
			value: asset.weight * 100, // 퍼센트로 변환
			code: asset.code,
			market: asset.market,
			weight: asset.weight,
		})) || [];

	// weight 기준으로 내림차순 정렬
	const sortedOldAssets = oldAssets
		.slice()
		.sort((a, b) => b.weight - a.weight);

	return (
		<DetailContainer title={'기존 포트폴리오'}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<ResponsiveContainer width="60%" height={300}>
					<BarChart
						data={sortedOldAssets} // 정렬된 데이터 전달
						layout="vertical"
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
						barSize={20}
						onMouseMove={state => {
							if (state.isTooltipActive) {
								const index = state.activeTooltipIndex;
								setHighlightedStockIndex(index);
							} else {
								setHighlightedStockIndex(null);
							}
						}}>
						<XAxis type="number" />
						<YAxis
							fontSize={12}
							type="category"
							dataKey="name"
							tickFormatter={name => truncateString(name, 5)} // Y축에 표시되는 이름 자르기
						/>
						<Tooltip
							formatter={(value, name) => [
								`${value}%`,
								truncateString(name, 20), // 툴팁에서 이름 자르기
							]}
						/>
						<CartesianGrid strokeDasharray="3 3" />
						<Bar
							dataKey="value"
							name="비율"
							fill={colors.main.primary500}
							background={{ fill: '#eee' }}
						/>
					</BarChart>
				</ResponsiveContainer>

				<PortfolioAssetList
					assets={sortedOldAssets} // 정렬된 데이터를 전달
					hoveredIndex={highlightedStockIndex} // 강조될 항목의 인덱스 전달
				/>
			</div>
		</DetailContainer>
	);
};

export default RebalanceBefore;
