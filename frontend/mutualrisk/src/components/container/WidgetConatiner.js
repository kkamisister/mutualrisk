import { Stack } from '@mui/material';
import { colors } from 'constants/colors';

const WidgetContainer = ({ children, sx = {} }) => {
	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '20px',
				borderRadius: '20px',
				width: 'calc(100% - 40px)',
				height: 'calc(100% - 40px)',
				border: `solid 1px ${colors.point.stroke}`,
				...sx,
			}}>
			{children}
		</Stack>
	);
};

export default WidgetContainer;
