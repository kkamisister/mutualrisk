import React from 'react';
import { Stack, Box, Avatar, Typography } from '@mui/material';
import { colors } from 'constants/colors';

const PortfolioAssetListItem = ({ asset }) => {
	return (
		<Stack
			direction="row"
			sx={{
				display: 'flex',
				justifyContent: 'space-evenly',
				alignItems: 'center',
				marginBottom: '20px',
			}}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginRight: '8px',
					flex: 1,
				}}>
				{/* 좌측 아이콘 및 정보 */}
				<Box
					sx={{
						display: 'flex',
					}}>
					<Avatar
						src={asset.imagePath}
						alt={asset.name}
						sx={{ width: '36px', height: '36px', marginRight: '8px' }}
					/>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-evenly',
							marginRight: '20px',
						}}>
						<Typography
							sx={{
								color: colors.text.sub2,
								fontSize: '17px',
								fontWeight: '600',
								whiteSpace: 'nowrap',
							}}>
							{asset.name}
						</Typography>
					</Box>
				</Box>
				{/* 중간 금액 정보 */}
				<Box
					sx={{
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-evenly',
						textAlign: 'right',
						marginRight: '20px',
					}}>
					<Typography
						sx={{ color: 'red', fontWeight: 'bold', fontSize: '18px' }}>
						{asset.ratio}%
					</Typography>
				</Box>
			</Box>
		</Stack>
	);
};

export default PortfolioAssetListItem;
