import React from 'react';
import { Box } from '@mui/material';
import 'react-horizontal-scrolling-menu/dist/styles.css';

const PortfolioSummaryList = () => {
	return (
		<Box
			sx={{
				'& .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar':
					{
						display: 'none',
					},
				'& .react-horizontal-scrolling-menu--scroll-container': {
					scrollbarWidth: 'none',
					'-ms-overflow-style': 'none',
				},
			}}></Box>
	);
};

export default PortfolioSummaryList;
