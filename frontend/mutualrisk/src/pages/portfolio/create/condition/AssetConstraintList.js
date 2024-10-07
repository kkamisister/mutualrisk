import { useState, useEffect } from 'react';
import { Box, Input, Tooltip, Stack, Typography } from '@mui/material';
import BasicButton from 'components/button/BasicButton';
import BasicChip from 'components/chip/BasicChip';
import { colors } from 'constants/colors';
import { fetchPortfolioList } from 'utils/apis/analyze';
import { createPortfolio } from 'utils/apis/portfolio';
import useAssetStore from 'stores/useAssetStore';
import { useQuery } from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import { exportAs } from '@mui/x-data-grid/internals';

const AssetConstraintList = ({ assets }) => {
	const [hasPortfolio, setHasPortfolio] = useState(false);
	const totalCash = useAssetStore(state => state.totalCash);
	const [openInputModal, setOpenInputModal] = useState(false);
	const [lowerBounds, setLowerBounds] = useState(Array(assets.length).fill(0));
	const [upperBounds, setUpperBounds] = useState(Array(assets.length).fill(1));
	const [exactProportion, setExactProportion] = useState(
		Array(assets.length).fill(null)
	);
	const [isOverLimit, setIsOverLimit] = useState(
		Array(assets.length).fill(false)
	); // 초과 여부 상태 추가

	useQuery({
		queryKey: ['portfolioList'],
		queryFn: fetchPortfolioList,
		onSuccess: data => {
			setHasPortfolio(data.hasPortfolio);
		},
	});

	// totalCash가 변경될 때마다 초과 여부를 업데이트
	useEffect(() => {
		const updatedOverLimit = assets.map(asset => asset.price > totalCash);
		setIsOverLimit(updatedOverLimit);
	}, [totalCash, assets]);

	const handleLowerChange = (index, value) => {
		const updated = [...lowerBounds];
		updated[index] = value !== '' ? parseFloat(value) / 100 : 0;
		setLowerBounds(updated);
	};

	const handleUpperChange = (index, value) => {
		const updated = [...upperBounds];
		updated[index] = value !== '' ? parseFloat(value) / 100 : 1;
		setUpperBounds(updated);
	};

	const handleExactChange = (index, value) => {
		const updated = [...exactProportion];
		updated[index] = value !== '' ? parseFloat(value) / 100 : null;
		setExactProportion(updated);
	};

	const handleSubmit = () => {
		setOpenInputModal(true);
	};

	return (
		<Box sx={{ height: '100%', position: 'relative' }}>
			<Stack direction="row" spacing={2}>
				<BasicChip label="종목 이름" />
				<BasicChip label="최솟값 (%)" />
				<BasicChip label="최댓값 (%)" />
				<BasicChip label="지정 비율 (%)" />
			</Stack>

			<Box
				sx={{
					pt: 2,
					height: 'calc(100% - 200px)',
					overflowY: 'auto',
					'&::-webkit-scrollbar': { display: 'none' },
					msOverflowStyle: 'none',
					scrollbarWidth: 'none',
				}}>
				<Stack spacing={2}>
					{assets.map((asset, index) => (
						<Stack direction="row" key={asset.assetId} spacing={2}>
							<Stack
								sx={{
									flex: 1,
									alignItems: 'center',
									justifyContent: 'center',
									bgcolor: colors.background.box,
									borderRadius: '8px',
									fontSize: '12px',
									fontWeight: 'bold',
								}}>
								{asset.region === 'KR' ? (
									asset.name
								) : (
									<Tooltip title={asset.name}>
										<span>{asset.code}</span>
									</Tooltip>
								)}
							</Stack>

							<Input
								type="number"
								defaultValue={0}
								onChange={e => handleLowerChange(index, e.target.value)}
								sx={{
									flex: 1,
									backgroundColor: isOverLimit[index]
										? colors.background.red
										: 'inherit',
									borderRadius: '8px',
									textAlign: 'center',
								}}
								inputProps={{
									style: {
										textAlign: 'center',
									},
								}}
							/>

							<Input
								borderRadius="8px"
								type="number"
								defaultValue={100}
								onChange={e => handleUpperChange(index, e.target.value)}
								sx={{
									flex: 1,
									backgroundColor:
										exactProportion < 0 || exactProportion > 100
											? colors.background.red
											: 'inherit',
								}}
							/>

							<Input
								fullWidth
								type="number"
								defaultValue=""
								onChange={e => handleExactChange(index, e.target.value)}
								sx={{
									flex: 1,
									backgroundColor:
										exactProportion < 0 || exactProportion > 100
											? colors.background.red
											: 'inherit',
								}}
							/>
						</Stack>
					))}
				</Stack>
			</Box>
			<Stack direction="row" sx={{ alignItems: 'center' }}>
				<Tooltip
					title={
						hasPortfolio
							? '현재 포트폴리오의 자산 가치를 기반으로 산정된 금액입니다.'
							: ''
					}>
					<Typography sx={{ fontWeight: 'bold' }}>
						총자산 : {totalCash}원
					</Typography>
				</Tooltip>
				<EditIcon sx={{ fontSize: '12px', color: colors.text.sub1 }} />
			</Stack>
			<Box
				sx={{
					position: 'absolute',
					left: '50%',
					bottom: 0,
					transform: 'translateX(-50%)',
				}}>
				<BasicButton text="포트폴리오 제작하기" onClick={handleSubmit} />
			</Box>
		</Box>
	);
};

export default AssetConstraintList;
