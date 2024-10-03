import React from 'react';
import ScrollItem from 'components/scroll/ScrollItem';
import { useNavigate, useParams } from 'react-router-dom';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
const FundViewAllButton = ({ clicked }) => {
	const navigate = useNavigate();
	const params = useParams();
	return (
		<ScrollItem
			name="전체보기"
			icon={
				<ViewCarouselIcon sx={{ marginTop: '35px', fontSize: '45px' }} />
			}
			clicked={Object.keys(params).length === 0}
			onClick={() => navigate(`/fund/list`)}
		/>
	);
};

export default FundViewAllButton;
