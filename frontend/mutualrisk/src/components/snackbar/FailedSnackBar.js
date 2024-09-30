import React from 'react';
import { Box } from '@mui/material';
import { colors } from 'constants/colors';
import CancelIcon from '@mui/icons-material/Cancel';
import EditFeedbackSnackbar from './EditFeedbackSnackbar';

const FailedSnackbar = ({ message, openSnackbar, handleSnackbarClose }) => {
	return (
		<EditFeedbackSnackbar open={openSnackbar} onClose={handleSnackbarClose}>
			<CancelIcon sx={{ color: colors.point.red }} />
			<Box sx={{ color: colors.text.sub1, fontWeight: 500 }}>{message}</Box>
		</EditFeedbackSnackbar>
	);
};

export default FailedSnackbar;
