import React from 'react';
import { Modal, Box, TextField, Stack } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import InputAdornment from '@mui/material/InputAdornment';
import { colors } from 'constants/colors';
import Title from 'components/title/Title';
import SearchIcon from '@mui/icons-material/Search';
import StockSearchListItem from './StockSearchListItem';

const StockSearchModal = ({ open, handleClose }) => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 500,
					height: 300,
					bgcolor: 'background.paper',
					border: '1px solid',
					borderColor: colors.background.box,
					boxShadow: 24,
					padding: '20px',
					borderRadius: '10px',
				}}>
				<Stack spacing={2} sx={{ height: '100%' }}>
					<Title text="관심 종목 추가" />
					<TextField
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
							},
						}}
						fullWidth
						placeholder="종목 검색"
						id="fullWidth"
						size="small"
					/>
					<Stack
						spacing={1.5}
						sx={{ overflow: 'scroll', overflowX: 'hidden' }}>
						{[0, 0, 0, 0, 0, 0, 0, 0].map(() => (
							<StockSearchListItem />
						))}
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
};

export default StockSearchModal;
