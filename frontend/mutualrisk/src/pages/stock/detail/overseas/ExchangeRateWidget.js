import { colors } from 'constants/colors';
import React, { useEffect, useRef, memo } from 'react';
import { Stack } from '@mui/material';
function ExchangeRateWidget() {
	const container = useRef();

	useEffect(() => {
		const script = document.createElement('script');
		script.src =
			'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
		script.type = 'text/javascript';
		script.async = true;
		script.innerHTML = `
        {
            "symbol": "FX_IDC:USDKRW",
            "width": 350,
            "isTransparent": true,
            "colorTheme": "light",
            "locale": "kr"
        }`;
		container.current.appendChild(script);
	}, []);

	return (
		<Stack
			sx={{
				height: '95px',
				width: 'fit-content',
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
