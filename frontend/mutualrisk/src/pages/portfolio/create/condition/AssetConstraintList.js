import { useState } from 'react';
import { Box, Typography, Input } from '@mui/material';
import BasicButton from 'components/button/BasicButton';
import BasicChip from 'components/chip/BasicChip';
import axios from 'axios';
import useAssetStore from 'stores/useAssetStore';
import { colors } from 'constants/colors';
import { createPortfolio } from 'utils/apis/portfolio';

const AssetConstraintList = ({ assets }) => {
	const { totalCash } = useAssetStore(state => state.totalCash);
	const [lowerBounds, setLowerBounds] = useState(Array(assets.length));
	const [upperBounds, setUpperBounds] = useState(Array(assets.length));
	const [exactProportion, setExactProportion] = useState(Array(assets.length));

	const handleLowerChange = (index, value) => {
		const updated = [...lowerBounds];
		updated[index] = value !== '' ? parseFloat(value) : 0; // 기본값 0
		setLowerBounds(updated);
	};

	const handleUpperChange = (index, value) => {
		const updated = [...upperBounds];
		updated[index] = value !== '' ? parseFloat(value) : 100; // 기본값 100
		setUpperBounds(updated);
	};

	const handleExactChange = (index, value) => {
		const updated = [...exactProportion];
		updated[index] = value !== '' ? parseFloat(value) : null; // 기본값 null
		setExactProportion(updated);
	};

	const handleSubmit = async () => {
		try {
			const assetIds = assets.map(asset => asset.id);
			const response = await createPortfolio({
				totalCash,
				assetIds,
				lowerBounds,
				upperBounds,
				exactProportion,
			});

			console.log('포트폴리오 생성 성공:', response.data);
		} catch (error) {
			console.error('포트폴리오 생성 중 오류 발생:', error);
		}
	};

	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					mb: 2,
					gap: 2,
				}}>
				<BasicChip label="종목 이름" />
				<BasicChip label="최솟값 (%)" />
				<BasicChip label="최댓값 (%)" />
				<BasicChip label="지정 비율 (%)" />
			</Box>

			{assets.map((asset, index) => (
				<Box
					key={asset.id}
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						mb: 2,
						flexWrap: 'nowrap',
					}}>
					<Box
						sx={{
							flex: 1,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							bgcolor: colors.background.box,
							borderRadius: '8px',
							fontSize: '12px',
							fontWeight: 'bold',
							whiteSpace: 'nowrap', // 텍스트를 한 줄로 고정
							overflow: 'hidden', // 넘치는 텍스트 숨김
							textOverflow: 'ellipsis',
						}}>
						{asset.name}
					</Box>

					<Box sx={{ flex: 1, mx: 1 }}>
						<Input
							fullWidth
							label="최솟값"
							type="number"
							defaultValue={0}
							onChange={e => handleLowerChange(index, e.target.value)}
						/>
					</Box>

					<Box sx={{ flex: 1, mx: 1 }}>
						<Input
							label="최댓값"
							type="number"
							defaultValue={100}
							onChange={e => handleUpperChange(index, e.target.value)}
						/>
					</Box>

					<Box sx={{ flex: 1, mx: 1 }}>
						<Input
							label="지정비율"
							type="number"
							defaultValue={null}
							onChange={e => handleUpperChange(index, e.target.value)}
						/>
					</Box>
				</Box>
			))}

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}>
				<BasicButton
					text="포트폴리오 제작하기"
					onClick={handleSubmit}
					sx={{ mt: 'auto' }}
				/>
			</Box>
		</Box>
	);
};

export default AssetConstraintList;
