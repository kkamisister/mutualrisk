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
const FundSummary = ({ title, data }) => {
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
						title="보유종목 가치"
						content={`$${data.valueOfHoldings.toLocaleString('ko-KR')}`}
						titleColor={colors.text.main}
						contentColor={colors.text.sub1}
					/>
					<DataBox
						title="보유종목 개수(미국)"
						content={`${data.asset.length}개`}
						titleColor={colors.text.main}
						contentColor={colors.text.sub1}
					/>
				</Stack>
				<Stack direction="row" spacing={2}>
					<DataBox
						title="QoQ 회전율"
						content={
							data.QoQTurnOver
								? `${data.QoQTurnOver.toPrecision(2)}%`
								: ' - '
						}
						bgColor={colors.background.green}
						titleColor={colors.text.main}
						contentColor={colors.point.green}
					/>
					<DataBox
						title="QoQ 가치 변화"
						content={
							data.QoQChangeOfValue
								? `${data.QoQChangeOfValue.toPrecision(2)}%`
								: ' - '
						}
						bgColor={colors.background.green}
						titleColor={colors.text.main}
						contentColor={colors.point.green}
					/>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default FundSummary;
