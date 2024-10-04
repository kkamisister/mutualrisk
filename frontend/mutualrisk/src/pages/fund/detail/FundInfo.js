import React from 'react';
import { Stack, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import SubTitle from 'components/title/SubTitle';

const DataBox = ({ title, content, bgColor, titleColor, contentColor }) => {
	return (
		<Stack
			sx={{
				backgroundColor: bgColor,
				borderRadius: '10px',
				padding: '5px 10px 5px 10px',
				width: 'fit-content',
			}}>
			<Typography sx={{ color: titleColor, fontWeight: 'bold' }}>
				{title}
			</Typography>
			<Typography sx={{ color: contentColor, fontWeight: 'bold' }}>
				{content}
			</Typography>
		</Stack>
	);
};

const formatDate = dateString => {
	const date = new Date(dateString);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}년 ${month}월 ${day}일`;
};
const FundInfo = ({ title, data }) => {
	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '15px',
				borderRadius: '10px',
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			<SubTitle text={title} />
			<Stack sx={{ justifyContent: 'space-between' }} spacing={1}>
				<Stack direction="row" spacing={2}>
					<DataBox
						title="이름"
						content={data.ceo}
						titleColor={colors.text.main}
						contentColor={colors.text.sub1}
					/>

					<DataBox
						title="회사명"
						content={data.company}
						titleColor={colors.text.main}
						contentColor={colors.text.sub1}
					/>
				</Stack>
				<Stack direction="row" spacing={2}>
					<DataBox
						title="실적 발표일"
						content={formatDate(data.submissionDate)}
						bgColor={colors.background.box}
						titleColor={colors.text.main}
						contentColor={colors.text.sub1}
					/>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default FundInfo;
