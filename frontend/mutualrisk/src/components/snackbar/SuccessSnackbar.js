import React from 'react';
import { Box } from '@mui/material';
import { colors } from 'constants/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditFeedbackSnackbar from './EditFeedbackSnackbar';

const SuccessSnackbar = ({ message, openSnackbar, handleSnackbarClose }) => {
	return (
		<EditFeedbackSnackbar open={openSnackbar} onClose={handleSnackbarClose}>
			<CheckCircleIcon sx={{ color: colors.point.green }} />
			<Box sx={{ color: colors.text.sub1, fontWeight: 500 }}>{message}</Box>
		</EditFeedbackSnackbar>
	);
};

export default SuccessSnackbar;
