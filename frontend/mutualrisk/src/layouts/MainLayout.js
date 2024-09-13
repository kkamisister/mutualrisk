import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { colors } from 'constants/colors';

const MainLayout = () => {
	return (
    <AppBar 
			position="static"
			sx={{
				backgroundColor: colors.background.primary,
			}}
			>
			<Toolbar>
				<Box sx={{ flexGrow: 1}}>
				</Box>
				<Button 
					sx={{
						color: colors.text.main,
						fontSize: '12px',
					}}>
					<Typography>로그인</Typography>
				</Button>
			</Toolbar>
    </AppBar>
	);
};

export default MainLayout;
