import React, { useState } from 'react';
import {
	Modal,
	Box,
	TextField,
	Stack,
	CircularProgress,
	Typography,
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import InputAdornment from '@mui/material/InputAdornment';
import { colors } from 'constants/colors';
import Title from 'components/title/Title';
import SearchIcon from '@mui/icons-material/Search';
import StockSearchListItem from './StockSearchListItem';
import { useQuery } from '@tanstack/react-query';
import { fetchAssetsByKeyword } from 'utils/apis/asset';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const StockSearchModal = ({ open, handleClose, assetList }) => {
	const [keyword, setKeyword] = useState('');

	const { isLoading, data: searchResult = [] } = useQuery({
		queryKey: ['stockSearchResult', keyword], // keyword를 queryKey에 포함하여 키워드가 변경되면 새로운 요청 실행
		queryFn: () => fetchAssetsByKeyword(keyword),
		enabled: !!keyword, // 키워드가 있을 때만 요청 실행
	});

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
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
						fullWidth
						placeholder="티커 · 종목명 입력"
						id="fullWidth"
						size="small"
						value={keyword}
						onChange={e => setKeyword(e.target.value)} // 키워드 변경 시 state 업데이트
					/>
					{keyword === '' && (
						<Stack
							sx={{
								alignItems: 'center',
								justifyContent: 'center',
								height: '100%',
							}}>
							<SearchIcon
								sx={{
									color: colors.text.sub2,
									fontSize: '60px',
								}}
							/>
							<Typography color={colors.text.sub1}>
								{'종목 정보를 입력해주세요'}
							</Typography>
						</Stack>
					)}
					{isLoading && keyword !== '' && (
						<Stack
							sx={{
								alignItems: 'center',
								justifyContent: 'center',
								height: '100%',
							}}>
							<CircularProgress size="30px" />
						</Stack>
					)}
					{!isLoading && keyword !== '' && searchResult.length > 0 && (
						<Stack
							sx={{
								overflow: 'scroll',
								overflowX: 'hidden',
								'&::-webkit-scrollbar': {
									display: 'none',
								},
								'-ms-overflow-style': 'none',
								'scrollbar-width': 'none',
							}}>
							{searchResult.map(data => (
								<StockSearchListItem
									key={data.assetId}
									data={data}
									isAdded={
										assetList.filter(asset => {
											return asset.assetId === data.assetId;
										}).length !== 0
									}
								/>
							))}
						</Stack>
					)}
					{!isLoading && keyword !== '' && searchResult.length === 0 && (
						<Stack
							sx={{
								alignItems: 'center',
								justifyContent: 'center',
								height: '100%',
							}}>
							<SearchOffIcon
								sx={{
									color: colors.text.sub2,
									fontSize: '60px',
								}}
							/>
							<Typography color={colors.text.sub1}>
								{'관련 종목이 없어요'}
							</Typography>
						</Stack>
					)}
				</Stack>
			</Box>
		</Modal>
	);
};

export default StockSearchModal;
