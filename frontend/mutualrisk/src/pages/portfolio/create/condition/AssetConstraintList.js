import { useEffect, useState } from 'react';
import {
	Box,
	TextField,
	InputAdornment,
	Tooltip,
	Stack,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Avatar,
	Grid,
} from '@mui/material';
import BasicButton from 'components/button/BasicButton';
import BasicChip from 'components/chip/BasicChip';
import { colors } from 'constants/colors';
import { fetchPortfolioList } from 'utils/apis/analyze';
import useAssetStore from 'stores/useAssetStore';
import useConstraintStore from 'stores/useConstraintStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createPortfolio } from 'utils/apis/portfolio';
import { useNavigate } from 'react-router-dom';

const AssetConstraintList = ({ assets }) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const [openDialog, setOpenDialog] = useState(false);
	const [hasPortfolio, setHasPortfolio] = useState(false);
	const { totalCash, addTotalCash, updateTotalCash, setIsRecommended } =
		useAssetStore(state => ({
			totalCash: state.totalCash,
			addTotalCash: state.addTotalCash,
			updateTotalCash: state.updateTotalCash,
			setIsRecommended: state.setIsRecommended,
		}));

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

	const { data } = useQuery({
		queryKey: ['portfolioList'],
		queryFn: fetchPortfolioList,
	});

	useEffect(() => {
		// console.log('야 쿼리호 ㅜㄹ함?', data);
		if (data.hasPortfolio) {
			// console.log('아 유저 포폴잇다니까');
			setHasPortfolio(data.hasPortfolio);
		}
	}, [data]);

	const mutation = useMutation({
		mutationFn: createPortfolio,
		onSuccess: data => {
			queryClient.removeQueries('selectedAsset');
			setIsRecommended(false);
			// console.log('포트폴리오 제작 완료:', data);
			navigate('/rebalance/result');
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

	useEffect(() => {
		console.log(hasPortfolio);
	}, []);
	const handleUnlock = () => {
		setHasPortfolio(false);
		setOpenDialog(false);
	};

	const handleDialogClose = () => setOpenDialog(false);

	const handleTextFieldClick = () => {
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
		<Grid container justifyContent="space-between" sx={{ height: '100%' }}>
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

			{['종목 이름', '최솟값(%)', '최댓값(%)', '지정 비율(%)'].map(
				(label, index) => (
					<Grid item xs={3} key={index} px={1}>
						<BasicChip label={label} />
					</Grid>
				)
			)}

			<Box
				sx={{
					width: '100%',
					height: 'calc(100% - 140px)',
					overflowY: 'auto',
					'&::-webkit-scrollbar': { display: 'none' },
					msOverflowStyle: 'none',
					scrollbarWidth: 'none',
				}}>
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
					const imageURL = `https://j11a607.p.ssafy.io${asset.imagePath}/${asset.imageName}`;

					return (
						<Grid
							container
							item
							xs={12}
							key={asset.assetId}
							alignContent={'space-between'}>
							{/* 종목 이름 */}
							<Grid item xs={3}>
								<Stack
									p={1}
									direction="row"
									spacing={1}
									alignItems={'center'}
									height={'calc(100% - 16px)'}>
									<Avatar
										alt={asset.name}
										src={imageURL}
										sx={{ width: 24, height: 24 }}
									/>
									<Box>
										{asset.region === 'KR' ? (
											asset.name
										) : (
											<Tooltip title={asset.name}>
												<span>{asset.code}</span>
											</Tooltip>
										)}
									</Box>
								</Stack>
							</Grid>

							{/* 최솟값 */}
							<Grid item xs={3} p={1}>
								<Stack
									sx={{
										justifyContent: 'center',
										alignItems: 'center',
										width: '100%',
									}}>
									<Tooltip title={lowerBoundTooltip || priceTooltip}>
										<TextField
											type="number"
											error={
												isLowerBoundExceeded || isPriceOverTotalCash
											}
											onClick={handleTextFieldClick}
											disabled={hasPortfolio}
											variant="outlined"
											defaultValue={0}
											onChange={e =>
												setLowerBound(index, e.target.value)
											}
											size="small"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														%
													</InputAdornment>
												),
												sx: {
													backgroundColor:
														isLowerBoundExceeded ||
														isPriceOverTotalCash
															? colors.background.red
															: 'inherit',
													borderRadius: '4px',
												},
												inputProps: { min: 0, max: 100, step: 1 },
											}}
										/>
									</Tooltip>
								</Stack>
							</Grid>

							{/* 최댓값 */}
							<Grid item xs={3} p={1}>
								<Stack
									sx={{
										justifyContent: 'center',
										alignItems: 'center',
										width: '100%',
									}}>
									<Tooltip title={upperBoundTooltip || priceTooltip}>
										<TextField
											type="number"
											error={
												isUpperBoundUnderLimit ||
												isPriceOverTotalCash
											}
											onClick={handleTextFieldClick}
											disabled={hasPortfolio}
											variant="outlined"
											defaultValue={100}
											onChange={e =>
												setUpperBound(index, e.target.value)
											}
											size="small"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														%
													</InputAdornment>
												),
												sx: {
													backgroundColor:
														isLowerBoundExceeded ||
														isPriceOverTotalCash
															? colors.background.red
															: 'inherit',
													borderRadius: '4px',
												},
												inputProps: { min: 0, max: 100, step: 1 },
											}}
										/>
									</Tooltip>
								</Stack>
							</Grid>

							{/* 지정 비율 */}
							<Grid item xs={3} p={1}>
								<Stack
									sx={{
										justifyContent: 'center',
										alignItems: 'center',
										width: '100%',
									}}>
									<Tooltip title={priceTooltip}>
										<TextField
											type="number"
											error={isPriceOverTotalCash}
											onClick={handleTextFieldClick}
											disabled={hasPortfolio}
											variant="outlined"
											defaultValue=""
											onChange={e =>
												setExactProportion(index, e.target.value)
											}
											size="small"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														%
													</InputAdornment>
												),
												sx: {
													backgroundColor:
														isLowerBoundExceeded ||
														isPriceOverTotalCash
															? colors.background.red
															: 'inherit',
													borderRadius: '4px',
												},
												inputProps: { min: 0, max: 100, step: 1 },
											}}
										/>
									</Tooltip>
								</Stack>
							</Grid>
						</Grid>
					);
				})}
			</Box>

			<Grid
				container
				item
				xs={12}
				justifyContent={'space-evenly'}
				rowSpacing={1}>
				<Grid item xs={6}>
					<TextField
						label="총자산"
						value={totalCash}
						onChange={e => updateTotalCash(Number(e.target.value))}
						type="number"
						size="small"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">원</InputAdornment>
							),
						}}
					/>
				</Grid>

				{[
					{ label: '만원', amount: 10000 },
					{ label: '십만원', amount: 100000 },
					{ label: '백만원', amount: 1000000 },
					{ label: '천만원', amount: 10000000 },
				].map(({ label, amount }) => (
					<Grid item xs={1.3} key={label}>
						<Button
							fullWidth
							onClick={() => addTotalCash(amount)}
							sx={{
								fontSize: '12px',
								border: 'solid 1px',
								borderRadius: '4px',
								fontWeight: 600,
								borderColor: colors.point.stroke,
								color: colors.text.sub1,
							}}>
							{label}
						</Button>
					</Grid>
				))}

				<Grid item xs={12} display="flex" justifyContent="center">
					<BasicButton text="포트폴리오 제작하기" onClick={handleSubmit} />
				</Grid>
			</Grid>
		</Grid>
	);
};

export default AssetConstraintList;
