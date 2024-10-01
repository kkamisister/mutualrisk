import React from 'react';
import { Stack } from '@mui/material';
import TechnicalAnalysisWidget from './TechnicalAnalysisWidget';
import FundamentalDataWidget from './FundamentalDataWidget';
import CompanyProfileWidget from './CompanyProfileWidget';
const OverseasInfoTab = ({ market, code }) => {
	return (
		<Stack direction="column" spacing={1}>
			<CompanyProfileWidget market={market} code={code} />

			<Stack direction="row" spacing={1}>
				<TechnicalAnalysisWidget market={market} code={code} />
				<FundamentalDataWidget market={market} code={code} />
			</Stack>
		</Stack>
	);
};

export default OverseasInfoTab;
