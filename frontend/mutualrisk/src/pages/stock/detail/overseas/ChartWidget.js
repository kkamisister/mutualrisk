// TradingViewWidget.jsx
import { colors } from 'constants/colors';
import React, { useEffect, useRef, memo } from 'react';

function ChartWidget({ market, code }) {
	const container = useRef();

	useEffect(() => {
		const script = document.createElement('script');
		script.src =
			'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
		script.type = 'text/javascript';
		script.async = true;
		script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${market}:${code}",
          "timezone": "Asia/Seoul",
          "theme": "light",
          "style": "1",
          "locale": "kr",
          "withdateranges": true,
		  "backgroundColor": "rgba(255, 255, 255, 1)",
          "range": "YTD",
          "hide_side_toolbar": false,
          "allow_symbol_change": false,
          "details": false,
          "hotlist": false,
          "calendar": false,
          "show_popup_button": false,
          "popup_width": "1000",
          "popup_height": "650",
          "support_host": "https://www.tradingview.com"
        }`;
		container.current.appendChild(script);
		console.log(container.current);
		container.current.style.border = 'none';
	}, []);

	return (
		<div
			className="tradingview-widget-container"
			ref={container}
			style={{
				height: '100%',
				width: '100%',

				clipPath: 'inset(2px)',
			}}>
			<div
				className="tradingview-widget-container__widget"
				style={{
					height: '100%',
					width: '100%',
				}}></div>
		</div>
	);
}

export default memo(ChartWidget);
