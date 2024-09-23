import React from 'react';
import {
	Typography,
	Modal,
	Box,
	TextField,
	Stack,
	Avatar,
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import InputAdornment from '@mui/material/InputAdornment';
import { colors } from 'constants/colors';
import Title from 'components/title/Title';
import SearchIcon from '@mui/icons-material/Search';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
const stockInfoSample = {
	title: '엔비디아',
	market: 'NASDAQ',
	symbol: 'NVDA',
	price: 13.55,
	fluctuateRate: 3.2,
	fluctuatePrice: 0.66,
	imageURL:
		'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-NAS00208X-E0.png',
};
const StockSearchListItem = () => {
	return (
		<Stack
			direction="row"
			sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
			<Stack
				direction="row"
				spacing={0.5}
				sx={{ alignItems: 'center', justifyItems: 'space-between' }}>
				<Avatar alt="종목 이미지" src={stockInfoSample.imageURL} />
				&nbsp;
				<Box sx={{ fontWeight: 'bold' }}>{stockInfoSample.title}</Box>
				<Box
					sx={{
						color: colors.text.sub2,
					}}>{`${stockInfoSample.symbol}(${stockInfoSample.market})`}</Box>
			</Stack>
			<StarOutlineIcon fontSize="large" sx={{ color: colors.text.main }} />
		</Stack>
	);
};

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
