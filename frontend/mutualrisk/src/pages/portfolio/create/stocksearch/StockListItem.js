import React from 'react';
import ScrollItem from 'components/scroll/ScrollItem';

const StockListItem = ({ name, imagePath, imageName, clicked, onClick }) => {
	const imageURL = `https://j11a607.p.ssafy.io${imagePath}/${imageName}`;
	return (
		<ScrollItem
			name={name}
			imagePath={imageURL}
			clicked={clicked}
			onClick={onClick}
			sx={{ border: 'none' }}
		/>
	);
};

export default StockListItem;
