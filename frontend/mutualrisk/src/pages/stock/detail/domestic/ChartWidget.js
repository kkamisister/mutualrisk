import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { fetchAssetHistoryByAssetId } from 'utils/apis/asset';

const ChartWidget = ({ assetId }) => {
	const chartContainerRef = useRef(null);
	const chartRef = useRef(null);
	const lineSeriesRef = useRef(null);
	const [chartData, setChartData] = useState([]);
	const loadingRef = useRef(false);
	const period = 100; // 한 번에 가져올 데이터 개수
	const offsetRef = useRef(0); // 데이터의 시작 지점
	const resizeObserver = useRef(null);
	const [hasMoreData, setHasMoreData] = useState(true); // 추가 데이터 여부

	const loadData = async () => {
		if (loadingRef.current || !hasMoreData) return;
		loadingRef.current = true;

		const data = await fetchAssetHistoryByAssetId({
			assetId,
			period,
			offset: offsetRef.current,
		});

		if (data && data.records) {
			const records = data.records.map(record => ({
				time: new Date(record.date).getTime() / 1000, // 유닉스 타임스탬프로 변환
				value: parseFloat(record.price),
			}));

			if (records.length === 0) {
				setHasMoreData(false);
			} else {
				// 함수형 업데이트로 최신 상태를 기반으로 chartData 업데이트
				setChartData(prevChartData => {
					// 새로운 데이터를 기존 데이터 앞에 추가
					const newData = [...records.reverse(), ...prevChartData];

					// 중복 제거 및 시간 순 정렬
					const uniqueData = Array.from(
						new Map(newData.map(item => [item.time, item])).values()
					).sort((a, b) => a.time - b.time);

					return uniqueData;
				});

				// offset 증가
				offsetRef.current += records.length;

				// 받아온 데이터가 period보다 적으면 더 이상 데이터가 없는 것으로 판단
				if (records.length < period) {
					setHasMoreData(false);
				}
			}
		} else {
			setHasMoreData(false);
		}
		loadingRef.current = false;
	};

	useEffect(() => {
		// 자산 ID가 변경될 때 상태 초기화
		offsetRef.current = 0;
		setChartData([]);
		setHasMoreData(true);

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
			loadData().then(() => {
				// 데이터 로딩 후에 차트 영역을 데이터에 맞게 조정
				chartRef.current.timeScale().fitContent();
			});

			// 컨테이너 크기 변경에 따른 차트 크기 조정
			resizeObserver.current = new ResizeObserver(entries => {
				for (let entry of entries) {
					const { width, height } = entry.contentRect;
					if (chartRef.current) {
						chartRef.current.applyOptions({ width, height });
						chartRef.current.timeScale().fitContent();
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
						loadData();
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
	}, [assetId]);

	// chartData가 변경될 때마다 차트 업데이트
	useEffect(() => {
		if (lineSeriesRef.current && chartData.length > 0) {
			lineSeriesRef.current.setData(chartData);
		}
	}, [chartData]);

	return (
		<div
			ref={chartContainerRef}
			style={{
				width: '100%',
				height: '100%',
				padding: '20px', // 부모 컴포넌트의 패딩 반영
				boxSizing: 'border-box', // 패딩을 포함하여 크기를 계산
			}}
		/>
	);
};

export default ChartWidget;
