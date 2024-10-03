import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { fetchAssetHistoryByAssetId } from 'utils/apis/asset';

const ChartWidget = ({ assetId }) => {
	const chartContainerRef = useRef();
	const chartRef = useRef();
	const lineSeriesRef = useRef();
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
		});

		lineSeriesRef.current = chartRef.current.addLineSeries();

		// 초기 데이터 로딩
		loadData(period);

		// 컨테이너 크기 변경에 따른 차트 크기 조정
		resizeObserver.current = new ResizeObserver(entries => {
			for (let entry of entries) {
				const { width, height } = entry.contentRect;
				chartRef.current.applyOptions({ width, height });
				setTimeout(() => {
					chartRef.current.timeScale().fitContent();
				}, 0);
			}
		});
		resizeObserver.current.observe(chartContainerRef.current);

		const onVisibleTimeRangeChanged = () => {
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
			chartRef.current
				.timeScale()
				.unsubscribeVisibleLogicalRangeChange(onVisibleTimeRangeChanged);
			chartRef.current.remove();
		};
	}, [assetId, period]);

	// 커스텀 툴팁 생성
	useEffect(() => {
		const toolTip = document.createElement('div');
		toolTip.className = 'chart-tooltip';
		toolTip.style.display = 'none';
		toolTip.style.position = 'absolute';
		toolTip.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
		toolTip.style.padding = '5px';
		toolTip.style.border = '1px solid #ccc';
		toolTip.style.borderRadius = '5px';
		toolTip.style.pointerEvents = 'none';
		toolTip.style.fontSize = '12px';
		chartContainerRef.current.appendChild(toolTip);

		const handleCrosshairMove = param => {
			if (
				!param.point ||
				!param.time ||
				param.point.x < 0 ||
				param.point.x > chartRef.current.width() ||
				param.point.y < 0 ||
				param.point.y > chartRef.current.height()
			) {
				toolTip.style.display = 'none';
				return;
			}

			const price = param.seriesPrices.get(lineSeriesRef.current);
			toolTip.style.display = 'block';
			const dateStr = new Date(param.time * 1000).toLocaleDateString();
			toolTip.innerHTML = `<strong>${dateStr}</strong><br/>Price: ${price}`;
			const coordinate = lineSeriesRef.current.priceToCoordinate(price);
			let toolTipY = coordinate - toolTip.clientHeight - 10;
			if (toolTipY < 0) {
				toolTipY = coordinate + 10;
			}

			const toolTipX = param.point.x - toolTip.clientWidth / 2;
			toolTip.style.left = `${toolTipX}px`;
			toolTip.style.top = `${toolTipY}px`;
		};

		chartRef.current.subscribeCrosshairMove(handleCrosshairMove);

		return () => {
			chartRef.current.unsubscribeCrosshairMove(handleCrosshairMove);
			chartContainerRef.current.removeChild(toolTip);
		};
	}, []);

	return (
		<div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
	);
};

export default ChartWidget;
