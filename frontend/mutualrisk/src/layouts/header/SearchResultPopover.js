import { Popover, Typography } from '@mui/material';
import React from 'react';

const SearchResultPopover = ({ id, open, anchorEl, onClose }) => {
	return (
		<Popover
			id={id}
			open={open}
			anchorEl={anchorEl}
			onClose={onClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}>
			<Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
		</Popover>
	);
};

export default SearchResultPopover;
