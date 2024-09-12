import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Sidebar from 'components/sidebar/Sidebar';
import { colors } from 'constants/colors';
import { Outlet } from 'react-router-dom';
const DashboardLayout = () => {
	const [isSidebarHovered, setIsSidebarHovered] = useState(false);

	return (
		<Stack
			direction="row"
			sx={{
				width: '100vw',
				height: '100vh',
				backgroundColor: colors.background.primary,
			}}>
			{/* Sidebar 컴포넌트에 hover 상태 변경 핸들러 전달 */}
			<Sidebar onHoverChange={setIsSidebarHovered} />
			<Box
				sx={{
					margin: '20px',
					transition: 'max-width 0.3s ease',
					maxWidth: `calc(100% - ${isSidebarHovered ? 200 : 73}px - 40px)`, // Sidebar의 hover 상태에 따라 Box의 너비 변경
				}}>
				<Outlet />
			</Box>
		</Stack>
	);
};

export default DashboardLayout;
