import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Stack } from '@mui/material';
import { colors } from 'constants/colors';

const ConfirmModal = ({
	modalTitle,
	nextButton,
	open,
	handleClose,
	handleSave,
	children,
}) => {
	const [inputContent, setInputContent] = useState('');

	const handleSaveClick = () => {
		handleSave(inputContent);
		handleClose();
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					borderRadius: '10px',
					boxShadow: 24,
					p: 4,
				}}>
				<Stack spacing={2}>
					<Typography variant="h6" sx={{ fontWeight: 'normal' }}>
						{modalTitle}
					</Typography>
					{children}
					<Stack direction="row" spacing={2} justifyContent="flex-end">
						<Button variant="outlined" onClick={handleClose}>
							취소
						</Button>
						<Button
							variant="contained"
							onClick={handleSaveClick}
							sx={{ backgroundColor: colors.main.primary400 }}>
							{nextButton}
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
};

export default ConfirmModal;
