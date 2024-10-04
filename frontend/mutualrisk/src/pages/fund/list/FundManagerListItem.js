import React from 'react';
import ScrollItem from 'components/scroll/ScrollItem';
import { useNavigate, useParams } from 'react-router-dom';
import { Tooltip } from '@mui/material';
const FundManagerListItem = ({ id, company, valueOfHoldings, image }) => {
	const navigate = useNavigate();
	const params = useParams();
	const checkClicked = id === params?.fundId;
	console.log({ id, company, valueOfHoldings, image });
	return (
		<Tooltip title={company}>
			<ScrollItem
				name={company}
				capital={valueOfHoldings}
				imagePath={image}
				clicked={checkClicked}
				onClick={() => navigate(`/fund/detail/${id}`)}
			/>
		</Tooltip>
	);
};

export default FundManagerListItem;
