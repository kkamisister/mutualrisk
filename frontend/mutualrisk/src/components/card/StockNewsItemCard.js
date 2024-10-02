import React from 'react';
import { Stack, Chip, Typography } from '@mui/material';
import { colors } from 'constants/colors';

const StockNewsItemCard = ({ news }) => {
	return (
		<Stack
			direction="row"
			spacing={2}
			sx={{
				backgroundColor: colors.background.box,
				padding: '13px',
				borderRadius: '10px',
				justifyContent: 'space-between',
				alignItems: 'center',
				cursor: 'pointer',
				'&:hover': {
					backgroundColor: colors.point.stroke,
				},
				transition: 'all 0.3s ease', // transition 적용
			}}
			onClick={() => {
				window.open(news.link, '_blank');
			}}>
			<Stack direction="column" spacing={0.3}>
				<Typography
					sx={{
						fontSize: '14px',
						color: colors.text.main,
						fontWeight: 'bold',
					}}>
					{news.title}
				</Typography>
				<Typography
					sx={{
						fontSize: '12px',
						color: colors.text.sub1,
					}}>
					{news.publishedAt}
				</Typography>
				<Stack
					direction="row"
					spacing={1}
					sx={{ flexWrap: 'wrap', alignContent: 'stretch' }}>
					{news.relatedAssets.map(data => {
						const label = `${data.name} ${data.dailyPriceChangeRate}%`;
						return (
							<Chip
								size="small"
								key={data.name}
								label={label}
								sx={{
									backgroundColor:
										data.dailyPriceChangeRate > 0
											? colors.background.green
											: colors.background.red,
									color:
										data.dailyPriceChangeRate > 0
											? colors.point.green
											: colors.point.red,
									height: '22px',
									fontSize: '12px',
								}}
								onClick={() => {
									console.log(data.name);
								}}></Chip>
						);
					})}
				</Stack>
			</Stack>
			{true ? (
				''
			) : (
				<img
					variant="rounded"
					alt="뉴스 이미지"
					src={news.thumbnailUrl}
					sx={{ height: '70px', width: 'auto' }}
					crossOrigin="anonymous"
				/>
			)}
		</Stack>
	);
};

export default StockNewsItemCard;
