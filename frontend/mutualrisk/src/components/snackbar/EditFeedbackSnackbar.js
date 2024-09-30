import React from 'react';
import { Box, Snackbar, Stack } from '@mui/material';
import { colors } from 'constants/colors';

const EditFeedbackSnackbar = ({ children, open, onClose }) => {
	console.log(children);
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={open}
			autoHideDuration={2000}
			onClose={onClose}>
			<Box
				sx={{
					padding: '10px',
					borderRadius: '10px',
					border: `1px solid ${colors.point.stroke}`,
					backgroundColor: colors.background.white,
				}}>
				<Stack
					direction="row"
					spacing={1}
					sx={{
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					{children}
				</Stack>
			</Box>
		</Snackbar>
	);
};

export default EditFeedbackSnackbar;
