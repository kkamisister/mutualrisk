import React from 'react';
import { Stack } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import Title from 'components/title/Title';
import WidgetContainer from 'components/container/WidgetConatiner';
import BasicButton from 'components/button/BasicButton';
import AssetConstraintList from './AssetConstraintList';

const ConditionSetting = ({ assets }) => {
	return (
		<WidgetContainer
			sx={{
				height: '100%',
				boxSizing: 'border-box',
				overflow: 'auto',
			}}>
			<Title
				text="제약 조건"
				caption="필요에 따라 최솟값ㆍ최댓값ㆍ지정비율을 지정할 수 있으며, 제약 조건을 설정하지 않을 시 최적 비율로 계산됩니다."
			/>
			<AssetConstraintList assets={assets} />
		</WidgetContainer>
	);
};

export default ConditionSetting;
