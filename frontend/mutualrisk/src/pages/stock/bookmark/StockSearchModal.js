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

const StockSearchModal = ({ open, handleClose }) => {
	const [keyword, setKeyword] = useState('');

	const getSearchResultData = async keyword => {
		if (!keyword) return { data: { assets: [] } }; // 빈 키워드일 경우 빈 결과 반환
		const response = await fetch(
			`https://j11a607.p.ssafy.io/api/v1/asset/keyword?keyword=${keyword}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'Bearer dummyAccessToken',
				},
				credentials: 'include',
			}
		);
		const data = await response.json();
		return data.data.assets;
	};

	const { isLoading, data: searchResult = [] } = useQuery({
		queryKey: ['searchResults', keyword], // keyword를 queryKey에 포함하여 키워드가 변경되면 새로운 요청 실행
		queryFn: () => getSearchResultData(keyword),
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
						placeholder="종목 검색"
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
								{'종목 정보를 입력해주세요!'}
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
					{!isLoading && keyword !== '' && (
						<Stack
							spacing={1.5}
							sx={{ overflow: 'scroll', overflowX: 'hidden' }}>
							{searchResult.map(data => (
								<StockSearchListItem key={data.assetId} data={data} />
							))}
						</Stack>
					)}
				</Stack>
			</Box>
		</Modal>
	);
};

export default StockSearchModal;
