import React from 'react';
import Box from '@mui/material/Box';

const IconImage = ({ src, alt }) => {
	return (
		<Box
			component="img"
			src={src}
			alt={alt}
			sx={{
				width: { xs: '60px', sm: '80px', md: '100px', lg: '150px' }, // 반응형 너비
				height: 'auto',
			}}
		/>
	);
};

export default IconImage;
