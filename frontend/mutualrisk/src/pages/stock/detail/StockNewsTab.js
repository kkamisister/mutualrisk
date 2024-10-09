import StockNewsList from 'components/news/StockNewsList';
import React from 'react';

const StockNewsTab = ({ newsList }) => {
	console.log(newsList);
	return <StockNewsList newsList={newsList} />;
};

export default StockNewsTab;
