import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { colors } from 'constants/colors';
const FundManagerListItem = ({ name, capital, imagePath }) => {
	console.log(name, capital, imagePath);
	return (
		<Stack
			sx={{
				backgroundColor: colors.background.white,
				width: '100px',
				height: '140px',
				borderRadius: '20px',
				border: 'solid 1px',
				borderColor: colors.point.stroke,
				color: colors.text.main,
				fontWeight: 'bold',
			}}>
			<Stack
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: '10px',
				}}
				spacing={0.75}>
				<Avatar
					style={{ width: '64px', height: '64px' }}
					alt="펀드사 이미지"
					src={imagePath}
				/>
				<Box sx={{ fontSize: '14px' }}>{name}</Box>
				<Box sx={{ fontSize: '12px' }}>
					${capital.toLocaleString('ko-KR')}
				</Box>
			</Stack>
		</Stack>
	);
};

export default FundManagerListItem;
