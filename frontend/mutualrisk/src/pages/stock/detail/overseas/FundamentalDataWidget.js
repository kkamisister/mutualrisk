import { colors } from 'constants/colors';
import React, { useEffect, useRef, memo } from 'react';
import { Stack } from '@mui/material';

function FundamentailDataWidget({ market, code }) {
	const container = useRef();

	useEffect(() => {
		const script = document.createElement('script');
		script.src =
			'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
		script.type = 'text/javascript';
		script.async = true;
		script.innerHTML = `
        {
            "isTransparent": true,
            "largeChartUrl": "",
            "displayMode": "regular",
            "width": "100%",
            "height": "100%",
            "colorTheme": "light",
            "symbol": "${market}:${code}",
            "locale": "kr"
        }`;
		container.current.appendChild(script);
	}, []);

	return (
		<Stack
			sx={{
				height: '765px',
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

export default memo(FundamentailDataWidget);
