import { Avatar, Box, Stack, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import CloseIcon from '@mui/icons-material/Close';

const SelectedItem = ({ asset, clicked, onClick }) => {
	return (
		<Stack
			direction="row"
			alignItems="center"
			sx={{
				bgcolor: colors.background.white,
				borderRadius: '10px',
				padding: '10px',
				m: 1,
				position: 'relative',
			}}>
			<Avatar
				alt={asset.name}
				src={`${asset.imagePath}/${asset.imageName}`}
				sx={{
					m: 1,
				}}
			/>
			<Box>
				<Box display="flex">
					<Typography
						sx={{
							color: colors.text.main,
							fontWeight: 'bold',
						}}>
						{asset.name}
					</Typography>
					<Typography sx={{ color: colors.text.sub2 }}>
						{asset.code}(asset.market)
					</Typography>
				</Box>
				<Box display="flex">
					<Typography>{asset.price}원</Typography>
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
						{asset.dailyPriceChange}원 ({asset.dailyPriceChangeRate}%)
					</Typography>
				</Box>
			</Box>
			<CloseIcon
				onClick={onClick}
				sx={{
					position: 'absolute',
					top: 0,
					right: 0,
					color: colors.text.sub2,
					p: 1,
					fontSize: 16,
					'&:hover': {
						color: colors.text.main,
					},
				}}
			/>
		</Stack>
	);
};

export default SelectedItem;
