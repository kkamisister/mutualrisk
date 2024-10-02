import { Stack, IconButton, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
					backgroundColor: colors.point.stroke, // hover 시 배경색 변경
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
export default AddStockButton;
