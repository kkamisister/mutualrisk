import React from 'react';
import ScrollItem from 'components/scroll/ScrollItem';

const StockListItem = ({ name, imagePath, clicked, onClick }) => {
	return (
		<ScrollItem
			name={name}
			imagePath={imagePath}
			clicked={clicked}
			onClick={onClick}
			sx={{ border: 'none' }}
		/>
	);
};

export default StockListItem;
