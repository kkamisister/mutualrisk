import { useState } from 'react';
import Box from '@mui/material/Box';
import FundManagerListItem from 'pages/fund/list/FundManagerListItem';
import HorizontalScrollContainer from 'components/scroll/HorizontalScrollContainer';

const fundManagerSampleInfoList = [
	{
		fundId: 1,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 2,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 3,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 4,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 5,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 6,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 7,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 8,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 9,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 10,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 11,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 12,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 13,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 14,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 11,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
];
const FundManagerList = () => {
	const [fundManagerInfoList] = useState(fundManagerSampleInfoList);

	return (
		<Box>
			<HorizontalScrollContainer>
				{fundManagerInfoList.map(info => (
					<FundManagerListItem
						key={info.fundId}
						name={info.name}
						capital={info.capital}
						imagePath={info.imagePath}
						clicked={info.clicked}
					/>
				))}
			</HorizontalScrollContainer>
		</Box>
	);
};

export default FundManagerList;
