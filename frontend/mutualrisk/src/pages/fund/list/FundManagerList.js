import { useState } from 'react';
import Box from '@mui/material/Box';
import FundManagerListItem from 'pages/fund/list/FundManagerListItem';
import HorizontalScrollContainer from 'components/scroll/HorizontalScrollContainer';
import FundViewAllButton from './FundViewAllButton';

import ScrollSkeletonCard from 'components/card/ScrollSkeletonCard';

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
						company={info.company}
						valueOfHoldings={info.valueOfHoldings}
						image={info.image}
						clicked={info.clicked}
					/>
				))}
			</HorizontalScrollContainer>
		</Box>
	);
};

export default FundManagerList;
