import React from 'react';
import ScrollItem from 'components/scroll/ScrollItem';
import { useNavigate } from 'react-router-dom';

const FundManagerListItem = ({ id, name, capital, imagePath, clicked }) => {
	const navigate = useNavigate();

	return (
		<ScrollItem
			name={name}
			imagePath={imagePath}
			capital={capital}
			clicked={clicked}
			onClick={() => navigate(`/fund/detail/${id}`)}
		/>
	);
};

export default FundManagerListItem;
