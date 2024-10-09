import React from 'react';
import Box from '@mui/material/Box';

const IconImage = ({ src, alt }) => {
	return (
		<Box
			component="img"
			src={src}
			alt={alt}
			sx={{
				width: '200px',
				height: 'auto',
				borderRadius: '10%',
			}}
		/>
	);
};

export default IconImage;
