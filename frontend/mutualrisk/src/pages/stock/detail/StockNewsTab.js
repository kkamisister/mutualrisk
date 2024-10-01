import React from 'react';
import StockNewsList from './StockNewsList';

const StockNewsTab = ({ newsList }) => {
	console.log(newsList);
	return <StockNewsList newsList={newsList} />;
};

export default StockNewsTab;
