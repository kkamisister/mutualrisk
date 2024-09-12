import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Sidebar from 'components/sidebar/Sidebar';
import { colors } from 'constants/colors';

const DashboardLayout = ({ children }) => {
	return (
		<Stack
			direction="row"
			sx={{
				width: '100vw',
				height: '100vh',
				backgroundColor: colors.background.primary,
			}}>
			<Sidebar />
			<Box sx={{ padding: '20px' }}>{children}</Box>
		</Stack>
	);
};

export default DashboardLayout;
