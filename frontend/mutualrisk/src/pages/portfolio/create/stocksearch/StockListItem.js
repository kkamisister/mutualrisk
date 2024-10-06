import React from 'react';
import ScrollItem from 'components/scroll/ScrollItem';
import { colors } from 'constants/colors';

const StockListItem = ({ name, imagePath, imageName, clicked, onClick }) => {
	const imageURL = `https://j11a607.p.ssafy.io${imagePath}/${imageName}`;
	return (
		<ScrollItem
			name={name}
			imagePath={imageURL}
			clicked={clicked}
			onClick={onClick}
			sx={{
				border: 'none',
				overflow: 'hidden',
				'&:hover': {
					overflow: 'visible',
					backgroundColor: colors.background.box,
				},
			}}
		/>
	);
};

export default StockListItem;
