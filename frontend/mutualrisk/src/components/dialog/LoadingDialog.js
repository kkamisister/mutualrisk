import { CircularProgress, Dialog, DialogContent, Stack } from '@mui/material';

export default function LoadingDialog({ onClose, open, children }) {
	return (
		<Dialog onClose={onClose} open={open}>
			<DialogContent>
				<Stack
					p={3}
					justifyContent="center"
					alignItems="center"
					spacing={2}>
					<CircularProgress size="150px" />
					{children}
				</Stack>
			</DialogContent>
		</Dialog>
	);
}
