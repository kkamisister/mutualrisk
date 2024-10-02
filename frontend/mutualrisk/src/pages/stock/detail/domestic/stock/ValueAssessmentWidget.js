import React from 'react';
import { Grid, Stack, Typography, Tooltip, Box } from '@mui/material';
import { colors } from 'constants/colors';
import SubTitle from 'components/title/SubTitle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const DescriptionTooltip = ({ title, description }) => {
	return (
		<Box>
			<Stack spacing={0.5}>
				<Typography color={colors.text.main} fontSize="14px">
					{title}
				</Typography>
				<Typography color={colors.text.sub1} fontSize="12px">
					{description}
				</Typography>
			</Stack>
		</Box>
	);
};
const DataBox = ({
	title,
	content,
	bgColor,
	titleColor,
	contentColor,
	description,
}) => {
	return (
		<Stack
			sx={{
				backgroundColor: bgColor,
				borderRadius: '10px',
				width: '100%',
			}}>
			<Stack
				direction="column"
				sx={{
					justifyContent: 'center',
					alignItems: 'flex-start',
					padding: '20px',
				}}>
				<Stack
					direction="row"
					sx={{ justifyContent: 'center', alignItems: 'center' }}
					spacing={0.5}>
					<Typography sx={{ fontSize: '14px', color: titleColor }}>
						{title}
					</Typography>
					{description && (
						<Tooltip
							componentsProps={{
								tooltip: {
									sx: {
										padding: '15px',
										backgroundColor: colors.background.white,
										boxShadow:
											'0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
										fontSize: 14,
										color: colors.text.sub1,
									},
								},
							}}
							title={
								<DescriptionTooltip
									title={title}
									description={description}
								/>
							}>
							<HelpOutlineIcon
								sx={{ fontSize: '16px', color: titleColor }}
							/>
						</Tooltip>
					)}
				</Stack>
				<Typography
					sx={{
						fontSize: '20px',
						color: contentColor,
						fontWeight: 'bold',
					}}>
					{content}
				</Typography>
			</Stack>
		</Stack>
	);
};

const description = {
	per: '주가를 주당순이익으로 나눈 값으로 PER이 낮을수록 기업이 내는 이익에 비해 주가가 저평가 되어 있다는 의미에요.',
	pbr: '주가를 주당순자산으로 나눈 값으로, PBR이 낮을수록 기업의 실제 자산가치 대비 주가가 저평가 되어 있다는 의미에요.',
	eps: '주가를 주당매출액으로 나눈 값으로, PSR이 낮을수록 기업의 매출액 대비 주가가 저평가 되어 있다는 의미에요.',
};

const ValueAssessmentWidget = ({ data }) => {
	return (
		<Stack
			sx={{
				backgroundColor: colors.background.white,
				padding: '15px',
				borderRadius: '10px',
				border: `solid 1px ${colors.point.stroke}`,
			}}
			spacing={1}>
			<SubTitle text="가치 평가 지표" />
			<Grid
				container
				sx={{
					justifyContent: 'space-evenly',
				}}
				spacing={1}>
				<Grid item xs={5}>
					<DataBox
						title="시가총액"
						content={data.marketValue}
						bgColor={colors.background.box}
						titleColor={colors.text.sub2}
						contentColor={colors.point.main}
					/>
				</Grid>
				<Grid item xs={5}>
					<DataBox
						title="PER"
						content={data.per}
						bgColor={colors.background.box}
						titleColor={colors.text.sub2}
						contentColor={colors.point.main}
						description={description.per}
					/>
				</Grid>
				<Grid item xs={5}>
					<DataBox
						title="PBR"
						content={data.pbr}
						bgColor={colors.background.box}
						titleColor={colors.text.sub2}
						contentColor={colors.point.main}
						description={description.pbr}
					/>
				</Grid>
				<Grid item xs={5}>
					<DataBox
						title="EPS"
						content={data.eps}
						bgColor={colors.background.box}
						titleColor={colors.text.sub2}
						contentColor={colors.point.main}
						description={description.eps}
					/>
				</Grid>
			</Grid>
		</Stack>
	);
};

export default ValueAssessmentWidget;
