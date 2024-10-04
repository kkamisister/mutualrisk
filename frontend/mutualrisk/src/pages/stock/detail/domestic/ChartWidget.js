import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { fetchAssetHistoryByAssetId } from 'utils/apis/asset';

const ChartWidget = ({ assetId }) => {
	const chartContainerRef = useRef(null);
	const chartRef = useRef(null);
	const lineSeriesRef = useRef(null);
	const [chartData, setChartData] = useState([]);
	const loadingRef = useRef(false);
	const [period, setPeriod] = useState(100); // 초기 period 설정
	const resizeObserver = useRef(null);
	const [hasMoreData, setHasMoreData] = useState(true); // 추가 데이터 여부

	const loadData = async newPeriod => {
		if (!hasMoreData) return; // 더 이상 데이터가 없으면 로딩 중단
		loadingRef.current = true;
		const data = await fetchAssetHistoryByAssetId({
			assetId,
			period: newPeriod,
		});
		if (data && data.records) {
			const records = data.records.map(record => ({
				time: new Date(record.date).getTime() / 1000, // 유닉스 타임스탬프로 변환
				value: record.price,
			}));

			// 기존 데이터와 비교하여 데이터 길이가 동일하면 더 이상 로딩하지 않음
			if (records.length === chartData.length) {
				setHasMoreData(false);
			} else {
				// 중복 제거 및 시간 순 정렬
				const mergedData = [...records];
				const uniqueData = Array.from(
					new Map(mergedData.map(item => [item.time, item])).values()
				).sort((a, b) => a.time - b.time);

				setChartData(uniqueData);
				lineSeriesRef.current.setData(uniqueData);
			}
		} else {
			setHasMoreData(false);
		}
		loadingRef.current = false;
	};

	useEffect(() => {
		// 차트 생성
		if (chartContainerRef.current) {
			chartRef.current = createChart(chartContainerRef.current, {
				width: chartContainerRef.current.clientWidth,
				height: chartContainerRef.current.clientHeight,
				layout: {
					backgroundColor: '#FFFFFF',
					textColor: '#333',
				},
				grid: {
					vertLines: {
						color: '#eee',
					},
					horzLines: {
						color: '#eee',
					},
				},
				crosshair: {
					mode: CrosshairMode.Normal,
				},
				rightPriceScale: {
					borderColor: '#ccc',
				},
				timeScale: {
					borderColor: '#ccc',
				},
				localization: {
					dateFormat: 'yyyy-MM-dd', // 날짜 형식을 YYYY-MM-DD로 설정
				},
			});

			lineSeriesRef.current = chartRef.current.addLineSeries();

			// 초기 데이터 로딩
			loadData(period);

			// 컨테이너 크기 변경에 따른 차트 크기 조정
			resizeObserver.current = new ResizeObserver(entries => {
				for (let entry of entries) {
					const { width, height } = entry.contentRect;
					if (chartRef.current) {
						chartRef.current.applyOptions({ width, height });
						setTimeout(() => {
							chartRef.current.timeScale().fitContent();
						}, 0);
					}
				}
			});
			resizeObserver.current.observe(chartContainerRef.current);

			const onVisibleTimeRangeChanged = () => {
				if (!chartRef.current || !lineSeriesRef.current) return;

				const visibleRange = chartRef.current
					.timeScale()
					.getVisibleLogicalRange();
				if (!visibleRange || loadingRef.current || !hasMoreData) return;

				const barsInfo =
					lineSeriesRef.current.barsInLogicalRange(visibleRange);

				if (barsInfo !== null && barsInfo.barsBefore !== null) {
					// 왼쪽 끝에 가까워졌을 때만 추가 데이터 로딩
					if (barsInfo.barsBefore < 10) {
						const newPeriod = period + 100;
						setPeriod(newPeriod);
						loadData(newPeriod);
					}
				}
			};

			chartRef.current
				.timeScale()
				.subscribeVisibleLogicalRangeChange(onVisibleTimeRangeChanged);

			return () => {
				if (resizeObserver.current && chartContainerRef.current) {
					resizeObserver.current.unobserve(chartContainerRef.current);
				}
				if (chartRef.current) {
					chartRef.current
						.timeScale()
						.unsubscribeVisibleLogicalRangeChange(
							onVisibleTimeRangeChanged
						);
					chartRef.current.remove();
					chartRef.current = null; // 참조 해제
				}
			};
		}
	}, [assetId, period]);

	return (
		<div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
	);
};

export default ChartWidget;
