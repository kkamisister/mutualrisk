import { useEffect, useState } from 'react';
import {
	Box,
	Input,
	Tooltip,
	Stack,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material';
import BasicButton from 'components/button/BasicButton';
import BasicChip from 'components/chip/BasicChip';
import { colors } from 'constants/colors';
import { fetchPortfolioList } from 'utils/apis/analyze';
import useAssetStore from 'stores/useAssetStore';
import useConstraintStore from 'stores/useConstraintStore';
import { useQuery, useMutation } from '@tanstack/react-query';
import { createPortfolio } from 'utils/apis/portfolio';

const AssetConstraintList = ({ assets }) => {
	const [openDialog, setOpenDialog] = useState(false);
	const [hasPortfolio, setHasPortfolio] = useState(false);
	const { totalCash, addTotalCash, updateTotalCash } = useAssetStore(
		state => ({
			totalCash: state.totalCash,
			addTotalCash: state.addTotalCash,
			updateTotalCash: state.updateTotalCash,
		})
	);

	const {
		initialization,
		lowerBounds,
		upperBounds,
		exactProportion,
		isLowerBoundExceeded,
		isUpperBoundUnderLimit,
		setLowerBound,
		setUpperBound,
		setExactProportion,
	} = useConstraintStore(state => ({
		initialization: state.initialization,
		lowerBounds: state.lowerBounds,
		upperBounds: state.upperBounds,
		exactProportion: state.exactProportion,
		isLowerBoundExceeded: state.isLowerBoundExceeded,
		isUpperBoundUnderLimit: state.isUpperBoundUnderLimit,
		setLowerBound: state.setLowerBound,
		setUpperBound: state.upperBounds,
		setExactProportion: state.setExactProportion,
	}));

	useEffect(() => {
		initialization(assets.length);
	}, []);

	useQuery({
		queryKey: ['portfolioList'],
		queryFn: fetchPortfolioList,
		onSuccess: data => {
			setHasPortfolio(data.hasPortfolio);
		},
	});

	const mutation = useMutation({
		mutationFn: createPortfolio,
		onSuccess: data => {
			console.log('포트폴리오 제작 완료:', data);
		},
		onError: error => {
			console.error('에러 발생:', error);
		},
	});

	const handleCreatePortfolio = () => {
		console.log('totalCash', totalCash);
		console.log('lowerBounds', lowerBounds);
		const assetIds = assets.map(asset => asset.assetId);
		console.log('assetIds', assetIds);
		console.log('lowerBoudns', lowerBounds);
		console.log('비율', exactProportion);
		mutation.mutate({
			totalCash,
			assetIds,
			lowerBounds,
			upperBounds,
			exactProportion,
		});
	};

	const handleUnlock = () => {
		setHasPortfolio(false);
		setOpenDialog(false);
	};

	const handleDialogClose = () => setOpenDialog(false);

	const handleInputClick = () => {
		if (hasPortfolio) {
			console.log('hasPortfolio', hasPortfolio);
			setOpenDialog(true);
			console.log('opendialog', openDialog);
		}
	};

	const handleSubmit = () => {
		handleCreatePortfolio();
	};

	return (
		<Box sx={{ height: '100%', position: 'relative' }}>
			<Dialog open={openDialog} onClose={handleDialogClose}>
				<DialogTitle>주의</DialogTitle>
				<DialogContent>
					제약 조건을 변경하면 최적 비율이 보장되지 않습니다. 그래도
					진행하시겠습니까?
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>취소</Button>
					<Button
						onClick={handleUnlock}
						backgroundColor={colors.background.red}>
						확인
					</Button>
				</DialogActions>
			</Dialog>

			<Stack direction="row" spacing={2}>
				<BasicChip label="종목 이름" />
				<BasicChip label="최솟값(%)" />
				<BasicChip label="최댓값 (%)" />
				<BasicChip label="지정 비율 (%)" />
			</Stack>

			<Box
				sx={{
					pt: 2,
					height: 'calc(100% - 140px)',
					overflowY: 'auto',
					'&::-webkit-scrollbar': { display: 'none' },
					msOverflowStyle: 'none',
					scrollbarWidth: 'none',
				}}>
				<Stack spacing={2}>
					{assets.map((asset, index) => {
						const isPriceOverTotalCash = asset.price > totalCash;
						const lowerBoundTooltip = isLowerBoundExceeded
							? '최소 비율 합이 100%를 초과했습니다.'
							: '';
						const upperBoundTooltip = isUpperBoundUnderLimit
							? '최대 비율 합이 100%미만입니다.'
							: '';
						const priceTooltip = isPriceOverTotalCash
							? '종목 가격이 총 자산보다 높습니다'
							: '';

						return (
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

								<Tooltip title={lowerBoundTooltip || priceTooltip}>
									<Input
										type="number"
										onClick={handleInputClick}
										disabled={hasPortfolio}
										defaultValue={0}
										onChange={e =>
											setLowerBound(index, e.target.value)
										}
										sx={{
											flex: 1,
											backgroundColor:
												isLowerBoundExceeded || isPriceOverTotalCash
													? colors.background.red
													: 'inherit',
											borderRadius: '8px',
											overflow: 'hidden',
										}}
										inputProps={{
											style: {
												textAlign: 'center',
												borderRadius: '8px',
											},
										}}
									/>
								</Tooltip>

								<Tooltip title={upperBoundTooltip || priceTooltip}>
									<Input
										type="number"
										onClick={handleInputClick}
										disabled={hasPortfolio}
										defaultValue={100}
										onChange={e =>
											setUpperBound(index, e.target.value)
										}
										sx={{
											flex: 1,
											backgroundColor:
												isUpperBoundUnderLimit ||
												isPriceOverTotalCash
													? colors.background.red
													: 'inherit',
											borderRadius: '8px',
											overflow: 'hidden',
										}}
										inputProps={{
											style: {
												textAlign: 'center',
												borderRadius: '8px',
											},
										}}
									/>
								</Tooltip>

								<Tooltip title={priceTooltip}>
									<Input
										type="number"
										onClick={handleInputClick}
										disabled={hasPortfolio}
										defaultValue=""
										onChange={e =>
											setExactProportion(index, e.target.value)
										}
										sx={{
											flex: 1,
											backgroundColor: isPriceOverTotalCash
												? colors.background.red
												: 'inherit',
											borderRadius: '8px',
											overflow: 'hidden',
										}}
										inputProps={{
											style: {
												textAlign: 'center',
												borderRadius: '8px',
											},
										}}
									/>
								</Tooltip>
							</Stack>
						);
					})}
				</Stack>
			</Box>

			<Stack
				spacing={2}
				sx={{
					justifyContent: 'center',
				}}>
				<Stack
					direction="row"
					justifyContent="center"
					sx={{ width: '100%' }}>
					<Tooltip
						title={
							hasPortfolio
								? '현재 포트폴리오의 자산 가치를 기반으로 산정된 금액입니다.'
								: ''
						}>
						<Box display="flex" alignItems="center" flex={2}>
							총자산:{' '}
							<Input
								sx={{ fontWeight: 'bold' }}
								value={totalCash}
								onChange={e => updateTotalCash(Number(e.target.value))}
								type="number"
							/>{' '}
							원
						</Box>
					</Tooltip>
					<Button onClick={() => addTotalCash(10000)}>만원</Button>
					<Button onClick={() => addTotalCash(100000)}>십만원</Button>
					<Button onClick={() => addTotalCash(1000000)}>백만원</Button>
					<Button onClick={() => addTotalCash(10000000)}>천만원</Button>
				</Stack>
				<BasicButton
					text="포트폴리오 제작하기"
					onClick={handleSubmit}
					sx={{ alignSelf: 'center' }}
				/>
			</Stack>
		</Box>
	);
};

export default AssetConstraintList;
