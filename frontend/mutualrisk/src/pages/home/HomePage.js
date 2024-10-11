import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import DataGridStackItemWidget from './DataGridStackItemWidget';
import PieChartStackItemWidget from './PieChartStackItemWidget';

const HomePage = () => {
	return (
		<Stack
			sx={{
				width: '100%',
				height: '100%',
				justifyContent: 'space-between',
				alignItems: 'center',

				marginBottom: '200px',
			}}
			spacing={30}>
			<Box
				sx={{
					position: 'fixed',
					aspectRatio: '1 / 1',
					top: '-224vh',
					height: '300vh',
					background:
						'radial-gradient(closest-side, #89d8d8 0%, rgba(49,130,246,0.15) 70%, rgba(255,255,255,0) 100%)',
					pointerEvents: 'none',
					zIndex: '-1',
				}}
			/>
			<DataGridStackItemWidget />
			<PieChartStackItemWidget />

			{/* <DataGridStackItemWidget /> */}
		</Stack>
	);
};

export default HomePage;
