import { Button } from '@mui/material';
import { colors } from 'constants/colors';

const BasicButton = ({ text, sx, ...props }) => {
	return (
		<Button
			sx={{
				backgroundColor: colors.main.primary200,
				color: colors.text.main,
				fontWeight: 'bold',
				padding: '5px 20px',
				borderRadius: '20px',
				'&:hover': {
					backgroundColor: colors.main.primary400,
				},
				cursor: 'pointer',
				...sx,
			}}
			{...props}>
			{text}
		</Button>
	);
};

export default BasicButton;
