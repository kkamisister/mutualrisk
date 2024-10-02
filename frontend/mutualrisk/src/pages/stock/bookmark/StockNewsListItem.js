import React from 'react';
import { Avatar, Stack, Chip, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import { useLocation } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

const StockNewsListItem = ({ news }) => {
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

export default StockNewsListItem;
