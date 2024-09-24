import { Box } from '@mui/material';
import SelectedItem from 'pages/portfolio/create/selectedstock/SeletedItem';

const SelectedList = ({ assets, onStockSelect }) => {
	return (
		<Box>
			{assets &&
				assets.map(asset => (
					<SelectedItem
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
