import { Box } from '@mui/material';
import SelectedListItem from 'pages/portfolio/create/selectedstock/SelectedListItem';
const SelectedList = ({ assets, onStockSelect }) => {
	return (
		<Box>
			{assets &&
				assets.map(asset => (
					<SelectedListItem
						key={asset.assetId}
						asset={asset}
						clicked={assets.some(
							selected => selected.assetId === asset.assetId
						)}
						onClick={() => onStockSelect(asset)}
					/>
				))}
		</Box>
	);
};

export default SelectedList;
