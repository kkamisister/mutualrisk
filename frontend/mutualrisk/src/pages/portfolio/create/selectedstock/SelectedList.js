import React from 'react';
import { Stack, Box } from '@mui/material';
import Title from 'components/title/Title';
import BasicButton from 'components/button/BasicButton';
import SelectedListItem from 'pages/portfolio/create/selectedstock/SelectedListItem';
import WidgetContainer from 'components/container/WidgetConatiner';

const SelectedList = ({ assets, onItemsConfirm, sx }) => {
	return (
		assets.length > 0 && (
			<WidgetContainer
				sx={{
					position: 'relative',
					boxSizing: 'border-box',
					width: '100%',
					...sx,
				}}>
				<Title text="담은 종목" />

				<Stack
					sx={{
						height: 'calc(100% - 80px)',
						overflowY: 'auto',
						'&::-webkit-scrollbar': { display: 'none' }, // 스크롤바 숨기기
						msOverflowStyle: 'none', // IE 및 Edge에서 스크롤바 숨기기
						scrollbarWidth: 'none', // Firefox에서 스크롤바 숨기기
						boxSizing: 'border-box',
					}}
					spacing={1}>
					{assets.map(asset => (
						<SelectedListItem key={asset.assetId} asset={asset} />
					))}
				</Stack>

				<Box
					sx={{
						position: 'absolute',
						left: '50%',
						bottom: 0,
						p: 2,
						transform: 'translateX(-50%)',
					}}>
					<BasicButton text="다음 단계" onClick={onItemsConfirm} />
				</Box>
			</WidgetContainer>
		)
	);
};

export default SelectedList;
