import { Stack } from '@mui/material';
import { colors } from 'constants/colors';

const WidgetContainer = ({ children }) => {
	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '20px',
				borderRadius: '20px',
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			{children}
		</Stack>
	);
};

export default WidgetContainer;
