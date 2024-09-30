import React from 'react';
import { Avatar, Stack, Chip, Typography } from '@mui/material';
import { colors } from 'constants/colors';
import { useLocation } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

const newsSampleData = {
	title: '가계빚 상승세 눈에 띄게 줄었다…“한국도 금리인하 여건 갖춰져”',
	link: 'https://n.news.naver.com/mnews/article/009/0005367116',
	pubDate: '2024.09.19. 오후 7:52',
	publisher: '조선일보',
	thumbnail:
		'https://imgnews.pstatic.net/image/009/2024/09/19/0005367116_001_20240919195217869.jpg?type=w647',
	relatedAssets: [
		{
			assetId: 34,
			name: '삼성전자',
			dailyPriceChangeRate: -0.05, // 전날 대비 5% 하락을 나타냄
			dailyPriceChange: -2800, // 전날 대비 2800원 하락을 나타냄
		},
	],
};

const StockNewsListItem = ({ news }) => {
	console.log(news);
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
