import SearchIcon from '@mui/icons-material/Search';
import { Input, Box } from '@mui/material';

const StockSearchBar = () => {
	return (
		<Box sx={{ width: '100%', display: 'flex' }}>
			<Input></Input>
			<SearchIcon />
		</Box>
	);
};

export default StockSearchBar;
