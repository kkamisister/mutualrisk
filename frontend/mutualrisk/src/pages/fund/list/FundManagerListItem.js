import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { colors } from 'constants/colors';
import { useNavigate } from 'react-router-dom';

const FundManagerListItem = ({ id, name, capital, imagePath, clicked }) => {
	const navigate = useNavigate();
	return (
		<Stack
			sx={{
				width: '100px',
				height: '140px',
				borderRadius: '20px',
				marginRight: '5px',
				cursor: 'pointer',
				fontWeight: clicked ? 'bold' : 'bold',
				color: clicked ? colors.text.main : colors.text.sub1, // 폰트 및 이미지 컬러
				backgroundColor: clicked
					? colors.background.box
					: colors.background.white, // 배경

				transition:
					'background-color 0.3s ease, color 0.3s ease, width 0.3s ease', // 부드러운 애니메이션

				'&:hover': {
					backgroundColor: colors.background.box, // hover시 일괄적으로 회색 유지
				},
				userSelect: 'none',
				border: `solid 1px ${colors.point.stroke}`,
			}}
			onClick={() => {
				navigate(`/fund/detail/${id}`);
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
