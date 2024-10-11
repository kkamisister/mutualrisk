import { colors } from 'constants/colors';
import React from 'react';
import { Stack, Avatar, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StockItemCard from 'components/card/StockItemCard';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import RemoveIcon from '@mui/icons-material/Remove';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { addBookmark, removeBookmark } from 'utils/apis/interest';
import { enqueueSnackbar } from 'notistack';

const FundStockListItem = ({
	assetId,
	code,
	name,
	region,
	market,
	rank,
	mvRank,
	valueOfHolding,
	valueOfHoldingRatio,
	currentValue,
	bookmark,
}) => {
	const queryClient = useQueryClient();

	// 북마크 추가를 처리하는 Mutation
	const removeMutation = useMutation({
		mutationFn: removeBookmark,
		onSuccess: () => {
			// 북마크 추가 후에 북마크 리스트를 다시 가져오기
			queryClient.invalidateQueries('fundList');
			enqueueSnackbar('북마크에서 제거했어요', { variant: 'error' });
		},
		// Optimistic 처리를 위해 onMutate 사용
		onMutate: assetId => {
			const queryAssetList = queryClient.getQueryData(['fundList']); // queryClient 내 저장되어 있는 assetList 값

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
			queryClient.invalidateQueries('fundList');
			enqueueSnackbar('북마크에 추가했어요', { variant: 'success' });
		},
		// Optimistic 처리를 위해 onMutate 사용
		onMutate: assetId => {
			const queryAssetList = queryClient.getQueryData([
				'fundList',
				'fundDetail',
			]); // queryClient 내 저장되어 있는 assetList 값

			return () =>
				queryClient.setQueryData(() => {
					queryAssetList.topHoldAndBuyAmount.topHoldAsset.filter(asset => {
						return asset === assetId;
					});

					queryAssetList.topHoldAndBuyAmount.topBuyAsset.filter(asset => {
						return asset === assetId;
					});
					return queryAssetList.topHoldAndBuyAmount;
				});
		},
	});
	const handleAddBookmark = assetId => {
		addMutation.mutate(assetId);
	};
	const handleRemoveBookmark = assetId => {
		removeMutation.mutate(assetId);
	};

	return (
		<StockItemCard
			assetId={assetId}
			code={code}
			market={market}
			name={name}
			image={`https://j11a607.p.ssafy.io/stockImage/${code}.png`}
			sx={{ width: 'calc(100%-40px)' }}>
			<Stack
				direction="row"
				spacing={1}
				sx={{
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}>
				<Box sx={{ fontSize: '12px' }}>
					${valueOfHolding.toLocaleString('ko-KR')}
				</Box>
				{valueOfHoldingRatio && (
					<Box sx={{ fontSize: '12px' }}>
						({`${valueOfHoldingRatio.toPrecision(2)}%`})
					</Box>
				)}
				<Box
					sx={{
						fontWeight: 'bold',
						fontSize: '14px',
					}}>
					{`${rank}위(${mvRank})`}
				</Box>

				{mvRank > 0 && <ArrowDropUpIcon sx={{ color: colors.point.red }} />}
				{mvRank < 0 && (
					<ArrowDropDownIcon sx={{ color: colors.point.blue }} />
				)}
				{mvRank === 0 && <RemoveIcon />}
				{bookmark ? (
					<StarIcon
						fontSize="large"
						onClick={event => {
							handleRemoveBookmark(assetId);
							event.stopPropagation();
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
						onClick={event => {
							handleAddBookmark(assetId);
							event.stopPropagation();
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
		</StockItemCard>
	);
};

export default FundStockListItem;
