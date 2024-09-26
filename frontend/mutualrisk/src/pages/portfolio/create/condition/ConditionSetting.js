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
				caption="필요에 따라 종목별 최솟값, 최댓값을 설정할 수 있습니다."
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
