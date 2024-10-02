import { useState, useEffect } from 'react';
import { Box, Typography, Input } from '@mui/material';
import BasicButton from 'components/button/BasicButton';
import BasicChip from 'components/chip/BasicChip';
import useAssetStore from 'stores/useAssetStore';
import { colors } from 'constants/colors';
import { createPortfolio } from 'utils/apis/portfolio';
import SuccessAlert from 'components/alert/SucessAlert';
import ErrorAlert from 'components/alert/ErrorAlert';
import AssetInputModal from 'pages/portfolio/create/AssetInputModal';
import { useQuery } from '@tanstack/react-query';
import { fetchPortfolioList } from 'utils/apis/analyze';

const AssetConstraintList = ({ assets }) => {
	const totalCashFromStore = useAssetStore(state => state.totalCash);
	const { data: userPortfolio, isLoading } = useQuery({
		queryKey: ['userPortfolio'],
		queryFn: fetchPortfolioList,
	});

	const [totalCash, setTotalCash] = useState(totalCashFromStore);
	useEffect(() => {
		if (totalCashFromStore === 0 && !isLoading && userPortfolio) {
			setTotalCash(userPortfolio.recentValuation);
		} else if (isLoading) {
			console.log('로딩 중...');
		}
	}, [totalCashFromStore, isLoading, userPortfolio]);

	const [openInputModal, setOpenInputModal] = useState(true);
	const [lowerBounds, setLowerBounds] = useState(Array(assets.length).fill(0));
	const [upperBounds, setUpperBounds] = useState(Array(assets.length).fill(1));
	const [exactProportion, setExactProportion] = useState(
		Array(assets.length).fill(null)
	);

	const handleLowerChange = (index, value) => {
		const updated = [...lowerBounds];
		updated[index] = value !== '' ? parseFloat(value) / 100 : 0; // 입력 값을 100으로 나눔
		setLowerBounds(updated);
	};

	const handleUpperChange = (index, value) => {
		const updated = [...upperBounds];
		updated[index] = value !== '' ? parseFloat(value) / 100 : 1; // 입력 값을 100으로 나눔
		setUpperBounds(updated);
	};

	const handleExactChange = (index, value) => {
		const updated = [...exactProportion];
		updated[index] = value !== '' ? parseFloat(value) / 100 : null; // 입력 값을 100으로 나눔
		setExactProportion(updated);
	};

	const createInitPortfolio = async () => {
		try {
			const assetIds = assets.map(asset => asset.assetId);
			// console.log('assetIds:', assetIds);
			// console.log('totalCash:', totalCash);
			// console.log('lowerBounds:', lowerBounds);
			// console.log('upperBounds', upperBounds);

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

	const handleSubmit = () => {
		// setOpenInputModal(true);
		createInitPortfolio();
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
					key={asset.assetId}
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
							whiteSpace: 'nowrap',
							textOverflow: 'ellipsis',
						}}>
						{asset.name}
					</Box>

					<Box sx={{ flex: 1, mx: 1 }}>
						<Typography variant="caption">최솟값</Typography>
						<Input
							fullWidth
							type="number"
							defaultValue={0}
							onChange={e => handleLowerChange(index, e.target.value)}
						/>
					</Box>

					<Box sx={{ flex: 1, mx: 1 }}>
						<Typography variant="caption">최댓값</Typography>
						<Input
							type="number"
							defaultValue={100}
							onChange={e => handleUpperChange(index, e.target.value)}
						/>
					</Box>

					<Box sx={{ flex: 1, mx: 1 }}>
						<Typography variant="caption">지정비율</Typography>
						<Input
							type="number"
							defaultValue={null}
							onChange={e => handleExactChange(index, e.target.value)}
						/>
					</Box>
				</Box>
			))}

			<BasicButton text="포트폴리오 제작하기" onClick={handleSubmit} />
			{!totalCash && (
				<AssetInputModal
					open={openInputModal}
					onClose={() => setOpenInputModal(false)}
				/>
			)}
		</Box>
	);
};

export default AssetConstraintList;
