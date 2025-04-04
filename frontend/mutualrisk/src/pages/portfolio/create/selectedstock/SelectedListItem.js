import { Stack, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import CloseIcon from '@mui/icons-material/Close';
import StockItemCard from 'components/card/StockItemCard';
import useAssetStore from 'stores/useAssetStore';
import { enqueueSnackbar } from 'notistack';

const SelectedListItem = ({ asset }) => {
	const imageURL = `https://j11a607.p.ssafy.io${asset.imagePath}/${asset.imageName}`;
	const price = Math.floor(asset.price).toLocaleString();
	const dailyPriceChange = Math.floor(asset.dailyPriceChange).toLocaleString();
	const { removeAsset } = useAssetStore(state => ({
		removeAsset: state.removeAsset,
	}));

	const deleteasset = asset => {
		removeAsset(asset.assetId);
		enqueueSnackbar(`담은 종목에서 ${asset.name} 종목을 제거했어요`, {
			variant: 'error',
		});
	};
	return (
		<StockItemCard
			sx={{ width: 'calc(100% - 20px)' }}
			code={asset.code}
			name={asset.name}
			market={asset.market}
			image={imageURL}>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center">
				<Stack sx={{ textAlign: 'right' }}>
					<Typography fontSize={'14px'}>{price}원</Typography>
					<Typography
						sx={{
							color:
								asset.dailyPriceChangeRate > 0
									? colors.point.red
									: asset.dailyPriceChangeRate < 0
									? colors.point.blue
									: colors.text.sub2,
							fontSize: 12,
						}}>
						{dailyPriceChange}원 ({asset.dailyPriceChangeRate}%)
					</Typography>
				</Stack>

				<CloseIcon
					onClick={() => deleteasset(asset)}
					sx={{
						color: colors.text.sub2,
						p: 1,
						fontSize: 16,
						'&:hover': {
							color: colors.text.main,
						},
					}}
				/>
			</Stack>
		</StockItemCard>
	);
};

export default SelectedListItem;
