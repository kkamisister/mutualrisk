import React, { useState } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AssetListItem from 'pages/portfolio/detail/asset/AssetListItem';

const AssetList = ({ assets, hoveredIndex }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 5;

	const totalPages = Math.ceil(assets.length / itemsPerPage);

	const startIndex = currentPage * itemsPerPage;
	const currentAssets = assets.slice(startIndex, startIndex + itemsPerPage);

	const handleNextPage = () => {
		if (currentPage + 1 < totalPages) {
			setCurrentPage(prev => prev + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(prev => prev - 1);
		}
	};

	return (
		<Stack
			sx={{
				height: '435px',
				position: 'relative',
			}}>
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}>
				<Box
					sx={{
						marginTop: '20px',
						minWidth: 0,
						flex: 1,
					}}>
					<Box sx={{ flex: 1 }}>
						{currentAssets.map((asset, index) => (
							<AssetListItem
								key={index}
								asset={asset}
								highlight={hoveredIndex === index + startIndex} // 현재 hover된 항목 강조
							/>
						))}
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<IconButton
						onClick={handlePrevPage}
						disabled={currentPage === 0}
						sx={{ color: currentPage === 0 ? 'grey' : 'black' }}>
						<ChevronLeftIcon fontSize="large" />
					</IconButton>
					<Typography variant="body1" sx={{ mx: 2 }}>
						{currentPage + 1} / {totalPages}
					</Typography>
					<IconButton
						onClick={handleNextPage}
						disabled={currentPage + 1 >= totalPages}
						sx={{
							color: currentPage + 1 >= totalPages ? 'grey' : 'black',
						}}>
						<ChevronRightIcon fontSize="large" />
					</IconButton>
				</Box>
			</Box>
		</Stack>
	);
};

export default AssetList;
