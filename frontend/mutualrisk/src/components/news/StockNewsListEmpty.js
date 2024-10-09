import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import { colors } from 'constants/colors';

const StockNewsListEmpty = () => {
	return (
		<Stack
			sx={{
				alignItems: 'center',
				justifyContent: 'center',
				height: '500px',
			}}>
			<Stack
				sx={{
					alignItems: 'center',
					justifyContent: 'center',
				}}
				spacing={2}>
				<SpeakerNotesOffIcon
					sx={{
						color: colors.text.sub2,
						fontSize: '60px',
					}}
				/>
				<Typography color={colors.text.sub1}>
					{'관련 뉴스 정보가 존재하지 않아요'}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default StockNewsListEmpty;
