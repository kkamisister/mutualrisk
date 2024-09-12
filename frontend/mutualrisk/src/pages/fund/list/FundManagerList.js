import React from 'react';
import Stack from '@mui/material/Stack';
import FundManagerListItem from 'pages/fund/list/FundManagerListItem';
const fundManagerInfoList = [
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
	{
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
	},
];
const FundManagerList = () => {
	return (
		<Stack
			direction="row"
			spacing={1}
			sx={{
				width: '100%',
				overflowX: 'auto',
				whiteSpace: 'nowrap',
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				'-ms-overflow-style': 'none', // IE and Edge
				'scrollbar-width': 'none', // Firefox
			}}>
			{fundManagerInfoList.map(info => (
				<FundManagerListItem
					name={info.name}
					capital={info.capital}
					imagePath={info.imagePath}
				/>
			))}
		</Stack>
	);
};

export default FundManagerList;
