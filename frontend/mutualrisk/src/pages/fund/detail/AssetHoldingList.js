import React from 'react';
import { Box, Stack, Avatar } from '@mui/material';
import { colors } from 'constants/colors';
import SubTitle from 'components/title/SubTitle';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Bar,
	ResponsiveContainer,
} from 'recharts';
const sampleData = [
	{
		name: '종목 A',
		보유수: 4000,
		pv: 2400,
	},
	{
		name: '종목 B',
		보유수: 3000,
		pv: 1398,
	},
	{
		name: '종목 C',
		보유수: 2000,
		pv: 9800,
	},
	{
		name: '종목 D',
		보유수: 2780,
		pv: 3908,
	},
	{
		name: '종목 E',
		보유수: 1890,
		pv: 4800,
	},
	{
		name: '종목 F',
		보유수: 2390,
		pv: 3800,
	},
	{
		name: '종목 G',
		보유수: 3490,
		pv: 4300,
	},
	{
		name: '종목 G',
		보유수: 3490,
		pv: 4300,
	},
	{
		name: '종목 G',
		보유수: 3490,
		pv: 4300,
	},
	{
		name: '종목 G',
		보유수: 3490,
		pv: 4300,
	},
	{
		name: '종목 G',
		보유수: 3490,
		pv: 4300,
	},
];

const stockInfoSample = {
	title: '엔비디아',
	market: 'NASDAQ',
	symbol: 'NVDA',
	holding: 1000000,
	holdingRate: 31.3,
	imageURL:
		'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-NAS00208X-E0.png',
};

const FundStockListItem = () => {
	return (
		<Stack
			direction="row"
			sx={{
				backgroundColor: colors.background.box,
				padding: '10px',
				borderRadius: '10px',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}>
			<Stack
				direction="row"
				spacing={0.5}
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Avatar alt="종목 이미지" src={stockInfoSample.imageURL} />
				&nbsp;
				<Box sx={{ fontWeight: 'bold' }}>{stockInfoSample.title}</Box>
				<Box
					sx={{
						color: colors.text.sub2,
					}}>{`${stockInfoSample.symbol}(${stockInfoSample.market})`}</Box>
			</Stack>
			<Stack
				direction="row"
				spacing={1}
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Box>
					{stockInfoSample.holding.toLocaleString('ko-KR')}
					&nbsp;USD
				</Box>
				<Box sx={{ fontSize: '18px' }}>{stockInfoSample.holdingRate}%</Box>
				<KeyboardArrowUpIcon sx={{ color: colors.point.red }} />
				<Box
					sx={{
						fontWeight: 'bold',
						fontSize: '20px',
					}}>
					1위
				</Box>

				<StarIcon sx={{ color: colors.point.yellow }} />
			</Stack>
		</Stack>
	);
};
const AssetHoldingList = ({ title, data }) => {
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
			<Stack>
				<Box sx={{ fontSize: '12px' }} height="250px" width="100%">
					<ResponsiveContainer>
						<BarChart data={sampleData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="보유수" fill={colors.main.primary200} />
						</BarChart>
					</ResponsiveContainer>
				</Box>
				<Stack spacing={1.5}>
					<FundStockListItem />
					<FundStockListItem />
					<FundStockListItem />
					<FundStockListItem />
					<FundStockListItem />
					<FundStockListItem />
					<FundStockListItem />
					<FundStockListItem />
					<FundStockListItem />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AssetHoldingList;
