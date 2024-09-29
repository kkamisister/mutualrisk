import React from 'react';
import { Box, Chip, Tooltip, IconButton } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import Title from 'components/title/Title';
import WidgetContainer from 'components/container/WidgetConatiner';
import BasicButton from 'components/button/BasicButton';
import ChipWithTooltip from 'components/chip/ChipWithTooltip';
import AssetConstraintList from './AssetConstraintList';

const ConditionSetting = ({ assets }) => {
	return (
		<Box
			sx={{
				minHeight: '100vh',
				p: 3,
			}}>
			<Title
				text="제약 조건"
				caption="대충 니가 설정한 거 최대한 맞춰주는데 주가때문에 못 맞출 수도 있어 알지?"
			/>
			<WidgetContainer
				sx={{
					minHeight: '100vh',
				}}>
				<AssetConstraintList assets={assets} />
			</WidgetContainer>
		</Box>
	);
};

export default ConditionSetting;
