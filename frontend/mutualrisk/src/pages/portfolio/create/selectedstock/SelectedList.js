import React from 'react';
import { Box } from '@mui/material';
import Title from 'components/title/Title';
import BasicButton from 'components/button/BasicButton';
import SelectedListItem from 'pages/portfolio/create/selectedstock/SelectedListItem';
import WidgetContainer from 'components/container/WidgetConatiner';

const SelectedList = ({ assets, onItemsConfirm, onStockSelect }) => {
	return (
		<Box>
			{assets.length > 0 && (
				<>
					<Title text="담은 종목" />
					<WidgetContainer
						sx={{
							maxHeight: '40vh',
							overflowY: 'auto',
							p: 2,
						}}>
						{assets.map(asset => (
							<SelectedListItem
								key={asset.assetId}
								asset={asset}
								clicked={assets.some(
									selected => selected.assetId === asset.assetId
								)}
								onClick={() => onStockSelect(asset)}
							/>
						))}
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
							}}>
							<BasicButton text="다음 단계" onClick={onItemsConfirm} />
						</Box>
					</WidgetContainer>
				</>
			)}
		</Box>
	);
};

export default SelectedList;
