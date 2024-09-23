import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { colors } from 'constants/colors';
import { useNavigate } from 'react-router-dom';
const SidebarItem = ({ title, Icon, move, clicked, hover }) => {
	const navigate = useNavigate();
	return (
		<Stack
			direction="row"
			sx={{
				justifyContent: 'flex-center',
				alignItems: 'center',
				width: hover ? '155px' : '30px',
				height: '31px',
				padding: '7px 5px 7px 11px',
				margin: '5px 3px 5px 3px',
				cursor: 'pointer',
				fontWeight: clicked ? 'bold' : 'normal',
				color: clicked ? colors.main.primary400 : colors.text.sub1, // 폰트 및 이미지 컬러
				backgroundColor: clicked ? colors.main.primary200 : '', // 배경
				transition:
					'background-color 0.3s ease, color 0.3s ease, width 0.3s ease', // 부드러운 애니메이션
				overflow: 'hidden', // 텍스트가 넘칠 때 숨김 처리
				whiteSpace: 'nowrap', // 텍스트를 한 줄로 유지
				'&:hover': {
					backgroundColor: colors.background.box, // hover시 일괄적으로 회색 유지
				},
				borderRadius: '10px',
				userSelect: 'none',
			}}
			onClick={() => {
				navigate(move);
			}}>
			<Icon sx={{ width: '24px', height: '24px' }} />
			{hover && <Box>&nbsp;&nbsp;{title}</Box>}
		</Stack>
	);
};

export default SidebarItem;
