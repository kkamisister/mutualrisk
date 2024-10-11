import { useState } from 'react';
import Box from '@mui/material/Box';
import FundManagerListItem from 'pages/fund/list/FundManagerListItem';
import HorizontalScrollContainer from 'components/scroll/HorizontalScrollContainer';
import FundViewAllButton from './FundViewAllButton';

import ScrollSkeletonCard from 'components/card/ScrollSkeletonCard';
const truncateString = (str, n) => {
	if (str.length > n) {
		return str.slice(0, n - 3) + '...';
	}
	return str;
};
const FundManagerList = ({ fundList }) => {
	return (
		<Box>
			<HorizontalScrollContainer>
				<FundViewAllButton />
				{fundList.length === 0 &&
					new Array(20).map((_, idx) => <ScrollSkeletonCard key={idx} />)}

				{fundList.map(info => (
					<FundManagerListItem
						key={info.id}
						id={info.id}
						company={truncateString(info.company, 28)}
						valueOfHoldings={Math.round(info.valueOfHoldings / 1000000)}
						image={info.image}
						clicked={info.clicked}
					/>
				))}
			</HorizontalScrollContainer>
		</Box>
	);
};

export default FundManagerList;
