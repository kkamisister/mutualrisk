import { Box, Stack, Avatar } from '@mui/material';
import { colors } from 'constants/colors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { addBookmark, removeBookmark } from 'libs/api';

const StockSearchListItem = ({
	data,
	isAdded,
	setOpenSuccessSnackbar,
	setFailedSuccessSnackbar,
}) => {
	const queryClient = useQueryClient();

	// 북마크 추가를 처리하는 Mutation
	const removeMutation = useMutation({
		mutationFn: removeBookmark,
		onSuccess: () => {
			// 북마크 추가 후에 북마크 리스트를 다시 가져오기
			queryClient.invalidateQueries('bookmark');
			setOpenSuccessSnackbar(true);
		},
	});
	const addMutation = useMutation({
		mutationFn: addBookmark,
		onSuccess: () => {
			// 북마크 추가 후에 북마크 리스트를 다시 가져오기
			queryClient.invalidateQueries('bookmark');
			setOpenSuccessSnackbar(true);
		},
	});
	const handleAddBookmark = assetId => {
		addMutation.mutate(assetId);
	};
	const handleRemoveBookmark = assetId => {
		removeMutation.mutate(assetId);
	};

	return (
		<Stack
			direction="row"
			sx={{
				width: 'calc(100% - 20px)',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '10px 10px 10px 10px',
				borderRadius: '10px',
				'&:hover': {
					backgroundColor: colors.background.box,
				},
			}}
			onClick={() => {}}>
			<Stack
				direction="row"
				spacing={0.5}
				sx={{
					alignItems: 'center',
					justifyItems: 'space-between',
					width: '100%',
				}}>
				<Avatar
					alt={`${data.name} 종목 이미지`}
					src={`http://j11a607.p.ssafy.io${data.imagePath}/${data.code}.png`}
				/>
				&nbsp;
				<Box sx={{ fontWeight: 'bold' }}>{data.name}</Box>
				<Box
					sx={{
						color: colors.text.sub2,
					}}>{`${data.code}(${data.market})`}</Box>
			</Stack>
			{isAdded ? (
				<StarIcon
					fontSize="large"
					onClick={() => {
						console.log(data);
						handleRemoveBookmark(data.assetId);
					}}
					sx={{ color: colors.point.yellow, cursor: 'pointer' }}
				/>
			) : (
				<StarOutlineIcon
					onClick={() => {
						console.log(data);
						handleAddBookmark(data.assetId);
					}}
					fontSize="large"
					sx={{ color: colors.text.main, cursor: 'pointer' }}
				/>
			)}
		</Stack>
	);
};

export default StockSearchListItem;
