import { useState } from 'react';
import { Stack, IconButton, Typography } from '@mui/material';
import { Box, Avatar, Snackbar, Paper } from '@mui/material';
import { colors } from 'constants/colors';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Select from 'react-select';
import StockSearchModal from './StockSearchModal';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import StockBookmarkListItem from './StockBookmarkListItem';
import useBookmarkStore from 'stores/useBookmarkStore';
import { useQueryClient } from '@tanstack/react-query';

import SuccessSnackbar from 'components/snackbar/SuccessSnackbar';
import FailedSnackbar from 'components/snackbar/FailedSnackBar';
const AddStockButton = ({ setOpenSearchModal }) => {
	return (
		<IconButton
			onClick={() => setOpenSearchModal(true)}
			sx={{
				backgroundColor: colors.background.box,
				padding: '10px',
				borderRadius: '10px',
				justifyContent: 'center',
				alignItems: 'center',
				'&:hover': {
					backgroundColor: colors.point.stroke, // hover 시 배경색 변경 (빨간색)
				},
			}}>
			<Stack
				direction="row"
				spacing={0.5}
				sx={{
					height: '40px',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<AddCircleOutlineIcon />
				<Typography
					sx={{
						fontSize: '14px',
						fontWeight: 500,
						color: colors.text.sub1,
					}}>
					추가하기
				</Typography>
			</Stack>
		</IconButton>
	);
};

const options = [
	{ value: 'price', label: '금액' },
	{ value: 'fluctuate', label: '변동률' },
	{ value: 'size', label: '시가총액' },
];

const StockBookmarkList = ({ assetList }) => {
	const [selectedOption, setSelectedOption] = useState(options[0]);
	const [openSearchModal, setOpenSearchModal] = useState(false);
	const [bookmarkListEdit, setBookmarkListEdit] = useState(false);

	const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false); // 성공했을 경우 열리는 Snackbar 상태
	const [openFailedSnackbar, setOpenFailedSnackbar] = useState(false); // 성공했을 경우 열리는 Snackbar 상태

	const handleSuccessSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSuccessSnackbar(false);
	};

	const handleFailedSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenFailedSnackbar(false);
	};

	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '15px',
				borderRadius: '10px',
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			<Stack
				direction="row"
				sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography
					sx={{ textDecoration: 'underline', cursor: 'pointer' }}
					onClick={() => setBookmarkListEdit(!bookmarkListEdit)}>
					{bookmarkListEdit ? '저장' : '편집'}
				</Typography>
				<Select
					defaultValue={selectedOption}
					value={selectedOption}
					options={options}
					onChange={newOption => setSelectedOption(newOption)}
				/>
			</Stack>
			<AddStockButton setOpenSearchModal={setOpenSearchModal} />

			{assetList.map(asset => {
				return (
					<Stack
						direction="row"
						sx={{
							justifyContent: 'flex-end',
							alignItems: 'center',
						}}>
						{/* 아이콘이 부드럽게 나타나도록 transition을 추가 */}
						{bookmarkListEdit && (
							<Stack
								sx={{
									justifyContent: 'center',
									alignItems: 'center',
									padding: '10px',
								}}>
								<RemoveCircleIcon sx={{ color: colors.point.red }} />
							</Stack>
						)}
						<StockBookmarkListItem asset={asset} />
					</Stack>
				);
			})}

			<StockSearchModal
				open={openSearchModal}
				handleClose={() => {
					setOpenSearchModal(false);
				}}
				setOpenSuccessSnackbar={setOpenSuccessSnackbar}
				setOpenFailedSnackbar={setOpenFailedSnackbar}
				assetList={assetList}
			/>
			<SuccessSnackbar
				message="북마크에 추가하였습니다"
				openSnackbar={openSuccessSnackbar}
				// openSnackbar={true}
				handleSnackbarClose={handleSuccessSnackbarClose}
			/>
			<FailedSnackbar
				message="북마크에서 제거하였습니다"
				openSnackbar={openFailedSnackbar}
				// openSnackbar={true}
				handleSnackbarClose={handleFailedSnackbarClose}
			/>
		</Stack>
	);
};

export default StockBookmarkList;
