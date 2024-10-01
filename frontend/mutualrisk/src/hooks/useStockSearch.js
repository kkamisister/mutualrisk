import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAssetsByKeyword } from 'utils/apis/asset';

const useStockSearch = () => {
	const [keyword, setKeyword] = useState('');

	const { isLoading, data: searchResult = [] } = useQuery({
		queryKey: ['stockSearchResult', keyword],
		queryFn: () => fetchAssetsByKeyword(keyword),
		enabled: !!keyword, // 키워드가 있을 때만 실행
	});

	return {
		keyword,
		setKeyword,
		isLoading,
		searchResult,
	};
};

export default useStockSearch;
