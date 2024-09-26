import React from 'react';
import { Box } from '@mui/material';
import Title from 'components/title/Title';

const ConditionSetting = ({ assets }) => {
	return (
		<Box>
			<Title
				text="제약 조건"
				caption="필요에 따라 종목별 최솟값, 최댓값을 설정할 수 있습니다."
			/>
		</Box>
	);
};

export default ConditionSetting;
