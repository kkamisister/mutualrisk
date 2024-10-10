import { useEffect, useState, useMemo } from 'react';
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
	const {
		totalCash,
		addTotalCash,
		updateTotalCash,
		setIsRecommended,
		isRecommended,
	} = useAssetStore(state => ({
		totalCash: state.totalCash,
		addTotalCash: state.addTotalCash,
		updateTotalCash: state.updateTotalCash,
		setIsRecommended: state.setIsRecommended,
		isRecommended: state.isRecommended,
	}));

	const {
		setLowerBound,
		setUpperBound,
		setExactProportion,
		lowerBounds,
		upperBounds,
		exactProportion,
		initializeConstraints,
	} = useConstraintStore(state => ({
		setLowerBound: state.setLowerBound,
		setUpperBound: state.setUpperBound,
		setExactProportion: state.setExactProportion,
		lowerBounds: state.lowerBounds,
		upperBounds: state.upperBounds,
		exactProportion: state.exactProportion,
		initializeConstraints: state.initializeConstraints,
	}));

	useEffect(() => {
		console.log('asset 초기화 체크');
		if (assets.length > 0) {
			console.log('assets 길이에 따라 제약 조건 초기화');
			console.log('asset.length', assets.length);
			console.log({ initializeConstraints });
			initializeConstraints(assets.length);
		}
	}, [assets]);

	// 제약 조건 관리 가보자고
	const [minErrors, setMinErrors] = useState([]);
	const [maxErrors, setMaxErrors] = useState([]);
	const [proErrors, setProErrors] = useState([]);
	const [minTooltips, setMinTooltips] = useState([]);
	const [maxTooltips, setMaxTooltips] = useState([]);
	const [proTooltips, setProTooltips] = useState([]);

	useEffect(() => {
		if (assets.length > 0) {
			// assets이 빈 배열이 아닌 경우에만 초기화
			const length = assets.length;

			setMinErrors(Array(length).fill(false));
			setMaxErrors(Array(length).fill(false));
			setProErrors(Array(length).fill(false));
			setMinTooltips(Array(length).fill(''));
			setMaxTooltips(Array(length).fill(''));
			setProTooltips(Array(length).fill(''));
		}
	}, [assets]);

	const validateErrors = () => {
		const minErrorsTemp = [...minErrors];
		const maxErrorsTemp = [...maxErrors];
		const proErrorsTemp = [...proErrors];
		const minTooltipsTemp = [...minTooltips];
		const maxTooltipsTemp = [...maxTooltips];
		const proTooltipsTemp = [...proTooltips];

		let minTotal = 0;
		let maxTotal = 0;
		let proTotal = 0;
		let hasProportion = true;

		assets.forEach((asset, index) => {
			const lowerBound = lowerBounds[index];
			const upperBound = upperBounds[index];
			const proportion = exactProportion[index];

			minTotal += Number(lowerBound);
			maxTotal += Number(upperBound);
			if (proportion !== null) proTotal += Number(proportion);

			// 최솟값이 최댓값보다 큰 경우
			if (Number(lowerBound) > Number(upperBound)) {
				minErrorsTemp[index] = true;
				minTooltipsTemp[index] = '최솟값이 최댓값보다 큽니다.';
			} else {
				minErrorsTemp[index] = false;
				minTooltipsTemp[index] = '';
			}

			// 지정 비율이 null이 아닌 경우 합산 필요
			if (proportion === null) {
				hasProportion = false;
			}
		});

		// 모든 최솟값 합이 100을 초과한 경우
		if (minTotal > 100) {
			minErrorsTemp.fill(true);
			minTooltipsTemp.fill('모든 최솟값의 합이 100을 초과했습니다.');
		}

		// 모든 최댓값 합이 100 미만인 경우
		if (maxTotal < 100) {
			maxErrorsTemp.fill(true);
			maxTooltipsTemp.fill('모든 최댓값의 합이 100 미만입니다.');
		}

		// 지정 비율이 null이 없고 합이 100이 아닌 경우
		if (hasProportion && proTotal !== 100) {
			proErrorsTemp.fill(true);
			proTooltipsTemp.fill('지정 비율의 합이 100이 아닙니다.');
		}

		setMinErrors(minErrorsTemp);
		setMaxErrors(maxErrorsTemp);
		setProErrors(proErrorsTemp);
		setMinTooltips(minTooltipsTemp);
		setMaxTooltips(maxTooltipsTemp);
		setProTooltips(proTooltipsTemp);
	};

	const { data } = useQuery({
		queryKey: ['portfolioList'],
		queryFn: fetchPortfolioList,
	});

	useEffect(() => {
		if (data?.hasPortfolio || isRecommended) {
			// console.log('아 유저 포폴잇다니까');
			setHasPortfolio(true);
		}
	}, [data, isRecommended]);

	const mutation = useMutation({
		mutationFn: createPortfolio,
		onSuccess: data => {
			// setIsRecommended(false);
			// console.log('제작완료 데이터', data);
			// console.log(JSON.stringify(data));
			queryClient.removeQueries('selectedAsset');
			// console.log('포트폴리오 제작 완료:', data);
			navigate('/rebalance/result', {
				state: { newPortfolioData: data.data },
			});
		},
		onError: error => {
			console.error('에러 발생:', error);
		},
	});

	const hasErrors = useMemo(
		() =>
			minErrors.some(Boolean) ||
			maxErrors.some(Boolean) ||
			proErrors.some(Boolean),
		[minErrors, maxErrors, proErrors]
	);

	const handleCreatePortfolio = () => {
		console.log('totalCash', totalCash);
		console.log('lowerBounds', lowerBounds);
		const assetIds = assets.map(asset => asset.assetId);

		// null이 아닌 값만 /100으로 변환
		const transformedLowerBounds = lowerBounds.map(value =>
			value !== null ? value / 100 : null
		);
		const transformedUpperBounds = upperBounds.map(value =>
			value !== null ? value / 100 : null
		);
		const transformedExactProportion = exactProportion.map(value =>
			value !== null ? value / 100 : null
		);

		console.log('assetIds', assetIds);
		console.log('변환된 lowerBounds', transformedLowerBounds);
		console.log('변환된 upperBounds', transformedUpperBounds);
		console.log('변환된 비율', transformedExactProportion);

		mutation.mutate({
			totalCash,
			assetIds,
			lowerBounds: transformedLowerBounds,
			upperBounds: transformedUpperBounds,
			exactProportion: transformedExactProportion,
		});
	};

	const handleUnlock = () => {
		setHasPortfolio(false);
		setOpenDialog(false);
	};

	const handleDialogClose = () => setOpenDialog(false);

	const handleTextFieldClick = () => {
		console.log('handletextfield');
		if (hasPortfolio) {
			console.log('hasPortfolio true고 handle해볼게', hasPortfolio);
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
					height: 'calc(100% - 150px)',
					overflowY: 'auto',
					'&::-webkit-scrollbar': { display: 'none' },
					msOverflowStyle: 'none',
					scrollbarWidth: 'none',
				}}>
				{assets.map((asset, index) => {
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
									<Tooltip title={minTooltips[index]}>
										<TextField
											type="number"
											onClick={handleTextFieldClick}
											error={minErrors[index]}
											disabled={hasPortfolio}
											variant="outlined"
											value={lowerBounds[index] || 0}
											defaultValue={0}
											onChange={e => {
												const value =
													e.target.value === ''
														? null
														: parseFloat(e.target.value);
												setLowerBound(index, value);
												validateErrors();
											}}
											size="small"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														%
													</InputAdornment>
												),
												sx: {
													backgroundColor: minErrors[index]
														? colors.background.red
														: 'inherit',
													borderRadius: '4px',
												},
												inputProps: {
													min: 0,
													max: 100,
													step: 1,
													onFocus: handleTextFieldClick,
												},
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
									<Tooltip title={maxTooltips[index]}>
										<TextField
											type="number"
											error={maxErrors[index]}
											onClick={handleTextFieldClick}
											disabled={hasPortfolio}
											variant="outlined"
											defaultValue={100}
											value={upperBounds[index] || 100}
											onChange={e => {
												const value =
													e.target.value === ''
														? null
														: parseFloat(e.target.value);
												setUpperBound(index, value);
												validateErrors();
											}}
											size="small"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														%
													</InputAdornment>
												),
												sx: {
													backgroundColor: maxErrors[index]
														? colors.background.red
														: 'inherit',
													borderRadius: '4px',
												},
												inputProps: {
													min: 0,
													max: 100,
													step: 1,
													onFocus: handleTextFieldClick,
												},
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
									<Tooltip title={proTooltips[index]}>
										<TextField
											type="number"
											error={proErrors[index]}
											onClick={handleTextFieldClick}
											disabled={hasPortfolio}
											variant="outlined"
											defaultValue=""
											value={exactProportion[index] ?? ''}
											onChange={e => {
												const value =
													e.target.value === ''
														? null
														: parseFloat(e.target.value);
												setExactProportion(index, value);
												validateErrors();
											}}
											size="small"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														%
													</InputAdornment>
												),
												sx: {
													backgroundColor: proErrors[index]
														? colors.background.red
														: 'inherit',
													borderRadius: '4px',
												},
												inputProps: {
													min: 0,
													max: 100,
													step: 1,
													onFocus: handleTextFieldClick,
												},
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
						onChange={e => {
							const value =
								e.target.value === ''
									? null
									: parseFloat(e.target.value);
							updateTotalCash(value);
						}}
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
					<BasicButton
						text="포트폴리오 제작하기"
						onClick={handleSubmit}
						disabled={hasErrors}
					/>{' '}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default AssetConstraintList;
