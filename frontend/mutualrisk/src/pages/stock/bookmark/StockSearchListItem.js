import { Box, Stack, Avatar } from '@mui/material';
import { colors } from 'constants/colors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { addBookmark, removeBookmark } from 'utils/apis/interest';
import { enqueueSnackbar } from 'notistack';

const StockSearchListItem = ({ data, isAdded }) => {
	const queryClient = useQueryClient();
	// 북마크 추가를 처리하는 Mutation
	const removeMutation = useMutation({
		mutationFn: removeBookmark,
		onSuccess: () => {
			// 북마크 추가 후에 북마크 리스트를 다시 가져오기
			queryClient.invalidateQueries('bookmark');
			enqueueSnackbar('북마크에서 제거했어요', { variant: 'error' });
		},
		// Optimistic 처리를 위해 onMutate 사용
		onMutate: assetId => {
			const queryAssetList = queryClient.getQueryData(['stockSearchResult']); // queryClient 내 저장되어 있는 assetList 값

			return () =>
				queryClient.setQueryData(() =>
					queryAssetList.filter(asset => {
						return asset !== assetId;
					})
				);
		},
	});
	const addMutation = useMutation({
		mutationFn: addBookmark,
		onSuccess: () => {
			// 북마크 추가 후에 북마크 리스트를 다시 가져오기
			queryClient.invalidateQueries('bookmark');
			enqueueSnackbar('북마크에 추가했어요', { variant: 'success' });
		},
		// Optimistic 처리를 위해 onMutate 사용
		onMutate: assetId => {
			const queryAssetList = queryClient.getQueryData(['stockSearchResult']); // queryClient 내 저장되어 있는 assetList 값

			return () =>
				queryClient.setQueryData(() =>
					queryAssetList.filter(asset => {
						return asset === assetId;
					})
				);
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
						handleRemoveBookmark(data.assetId);
					}}
					sx={{
						color: colors.point.yellow,
						cursor: 'pointer',
						'&:hover': { color: colors.point.yellowHover },
						transition: '0.3s',
					}}
				/>
			) : (
				<StarOutlineIcon
					onClick={() => {
						handleAddBookmark(data.assetId);
					}}
					fontSize="large"
					sx={{
						color: colors.text.main,
						cursor: 'pointer',
						'&:hover': { color: colors.text.sub2 },
						transition: '0.3s',
					}}
				/>
			)}
		</Stack>
	);
};

export default StockSearchListItem;
