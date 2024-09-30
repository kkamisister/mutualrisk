import React from 'react';
import { Grid, Typography } from '@mui/material';
import WidgetContainer from 'components/container/WidgetConatiner'; // WidgetContainer 컴포넌트 불러오기

const PortfolioSummary = () => {
	const stats = [
		{ title: '위험도', value: '다소 위험', color: 'red' },
		{ title: '예측 수익률', value: '1,779,000원', change: '-370,000원(10%)' },
		{ title: '평가 금액', value: '1,779,000원', change: '-370,000원(10%)' },
		{
			title: '위험률 대비 수익률',
			value: '1,779,000원',
			change: '-370,000원(10%)',
		},
	];

	return (
		<Grid container spacing={2} sx={{ width: '100%' }}>
			{stats.map((stat, index) => (
				<Grid item xs={6} key={index}>
					<WidgetContainer>
						<Typography variant="body1" gutterBottom>
							{stat.title}
						</Typography>
						<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
							{stat.value}
						</Typography>
						{stat.change && (
							<Typography variant="body2" sx={{ color: 'blue' }}>
								{stat.change}
							</Typography>
						)}
						{stat.color && (
							<div
								style={{
									width: '20px',
									height: '20px',
									backgroundColor: stat.color,
									borderRadius: '50%',
									marginTop: '10px',
								}}
							/>
						)}
					</WidgetContainer>
				</Grid>
			))}
		</Grid>
	);
};

export default PortfolioSummary;
