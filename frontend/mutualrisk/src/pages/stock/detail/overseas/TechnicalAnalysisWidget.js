import { colors } from 'constants/colors';
import React, { useEffect, useRef, memo } from 'react';
import { Stack } from '@mui/material';
function ExchangeRateWidget({ market, code }) {
	const container = useRef();

	useEffect(() => {
		const script = document.createElement('script');
		script.src =
			'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
		script.type = 'text/javascript';
		script.async = true;
		script.innerHTML = `
        {
            "interval": "1m",
            "width": "100%",
            "isTransparent": true,
            "height": "100%",
            "symbol": "${market}:${code}",
            "showIntervalTabs": true,
            "displayMode": "multiple",
            "locale": "kr",
            "colorTheme": "light"
        }`;
		container.current.appendChild(script);
	}, []);

	return (
		<Stack
			sx={{
				height: '1200px',
				width: '100%',
				borderRadius: '10px',
				backgroundColor: '#ffffff',
				border: `1px solid ${colors.point.stroke}`,
				overflow: 'hidden',
			}}>
			<div
				className="tradingview-widget-container"
				ref={container}
				style={{
					height: '100%',
					width: '100%',
				}}>
				<div
					className="tradingview-widget-container__widget"
					style={{ height: '100%', width: '100%' }}></div>
			</div>
		</Stack>
	);
}

export default memo(ExchangeRateWidget);
