import React from 'react';
import RebalanceBefore from 'pages/portfolio/rebalance/result/detail/RebalanceBefore';
import RebalanceAfter from 'pages/portfolio/rebalance/result/detail/RebalanceAfter';
import { DoubleArrowRounded } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import { colors } from 'constants/colors';

const RebalanceDetail = () => {
	return (
		<Stack
			spacing={1}
			direction={'row'}
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				height: '100%',
			}}>
			<RebalanceBefore sx={{ flex: 1 }} />
			<Stack
				spacing={0}
				direction={'row'}
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexShrink: 0,
				}}>
				<DoubleArrowRounded sx={{ color: colors.main.primary200 }} />
				<DoubleArrowRounded sx={{ color: colors.main.primary200 }} />
				<DoubleArrowRounded sx={{ color: colors.main.primary200 }} />
			</Stack>

			<RebalanceAfter sx={{ flex: 1 }} />
		</Stack>
	);
};

export default RebalanceDetail;
