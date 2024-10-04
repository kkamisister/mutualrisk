import React from 'react';
import ScrollItem from 'components/scroll/ScrollItem';
import { useNavigate, useParams } from 'react-router-dom';

const FundManagerListItem = ({ id, company, valueOfHoldings, image }) => {
	const navigate = useNavigate();
	const params = useParams();
	const checkClicked = id === params?.fundId;
	return (
		<ScrollItem
			name={company}
			capital={valueOfHoldings}
			imagePath={image}
			clicked={checkClicked}
			onClick={() => navigate(`/fund/detail/${id}`)}
		/>
	);
};

export default FundManagerListItem;
