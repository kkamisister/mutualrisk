import React, { useState } from 'react';
import {
	Modal,
	Box,
	Typography,
	TextField,
	Button,
	Stack,
} from '@mui/material';
import { colors } from 'constants/colors';

const ConfirmModal = ({ open, handleClose, handleSave }) => {
	const [portfolioName, setPortfolioName] = useState('');

	const handleInputChange = e => {
		setPortfolioName(e.target.value);
	};

	const handleSaveClick = () => {
		handleSave(portfolioName);
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
					<Typography
						variant="h6"
						component="h2"
						sx={{ fontWeight: 'normal' }}>
						포트폴리오 이름
					</Typography>
					<TextField
						label="포트폴리오 이름을 입력해주세요"
						variant="outlined"
						fullWidth
						value={portfolioName}
						onChange={handleInputChange}
					/>
					<Stack direction="row" spacing={2} justifyContent="flex-end">
						<Button variant="outlined" onClick={handleClose}>
							취소
						</Button>
						<Button
							variant="contained"
							onClick={handleSaveClick}
							sx={{ backgroundColor: colors.main.primary400 }}>
							저장
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
};

export default ConfirmModal;
