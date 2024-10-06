import { Stack } from '@mui/material';
import { colors } from 'constants/colors';

const WidgetContainer = ({ children, sx = {} }) => {
	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: 2,
				borderRadius: '20px',
				border: `solid 1px ${colors.point.stroke}`,
				...sx,
			}}>
			{children}
		</Stack>
	);
};

export default WidgetContainer;
