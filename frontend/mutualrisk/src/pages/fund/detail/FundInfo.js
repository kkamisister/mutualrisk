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
						content="워런 버핏"
						titleColor={colors.text.main}
						contentColor={colors.text.sub1}
					/>

					<DataBox
						title="회사명"
						content="버크셔 해서웨이(Berkshire Hathaway)"
						titleColor={colors.text.main}
						contentColor={colors.text.sub1}
					/>
				</Stack>
				<Stack direction="row" spacing={2}>
					<DataBox
						title="실적 발표일"
						content="2024년 01월 23일"
						bgColor={colors.background.box}
						titleColor={colors.text.main}
						contentColor={colors.text.sub1}
					/>

					<DataBox
						title="서류 제출 날짜"
						content="2024년 01월 05일"
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
