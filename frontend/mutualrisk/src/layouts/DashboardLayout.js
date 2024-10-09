import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Sidebar from 'components/sidebar/Sidebar';
import { colors } from 'constants/colors';
import { Outlet } from 'react-router-dom';
import HeaderLayout from './header/HeaderLayout';
import { useLocation } from 'react-router-dom';
const DashboardLayout = () => {
	const [isSidebarHovered, setIsSidebarHovered] = useState(false);
	const location = useLocation();
	return (
		<Stack
			direction="row"
			sx={{
				width: '100%',
				height: '100%',
			}}>
			<Box
				sx={{
					position: 'fixed',
					aspectRatio: '1 / 1',
					top: '-224vh',
					height: '300vh',
					left: '-40vw',
					background:
						'radial-gradient(closest-side, #89d8d8 0%, rgba(49,130,246,0.15) 70%, rgba(255,255,255,0) 100%)',
					pointerEvents: 'none',
					zIndex: '-1',
				}}
			/>
			{/* Sidebar 컴포넌트에 hover 상태 변경 핸들러 전달 */}
			<Sidebar onHoverChange={setIsSidebarHovered} />

			<Stack direction="column" sx={{ width: '100%' }}>
				{location.pathname !== '/portfolio/create' && (
					<HeaderLayout
						sx={{
							width: `calc(100% - ${isSidebarHovered ? 200 : 73}px)`, // Sidebar의 hover 상태에 따라 Box의 너비 변경
							left: isSidebarHovered ? 200 : 73,
							transition: 'width 0.3s ease, left 0.3s ease',
							position: 'sticky',
							top: 0,
							background: 'rgba(255,255,255,0.3)',
							backdropFilter: 'blur(3px)',
						}}
					/>
				)}
				<Box
					sx={{
						padding: '20px 20px 20px 20px',
						transition: 'all 0.3s ease, left 0.3s ease',
						marginLeft: isSidebarHovered ? '200px' : '73px',
						minHeight: 'calc(100% - 40px)',
						maxHeight: 'fit-content',
						width: `calc(100% - ${isSidebarHovered ? 200 : 73}px - 40px)`, // Sidebar의 hover 상태에 따라 Box의 너비 변경
					}}>
					<Outlet />
				</Box>
			</Stack>
		</Stack>
	);
};

export default DashboardLayout;
