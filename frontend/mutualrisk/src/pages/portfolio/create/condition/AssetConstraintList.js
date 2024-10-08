import { useState } from 'react';
import { Box, Input, Tooltip, Stack, Typography, Button } from '@mui/material';
import BasicButton from 'components/button/BasicButton';
import BasicChip from 'components/chip/BasicChip';
import { colors } from 'constants/colors';
import { fetchPortfolioList } from 'utils/apis/analyze';
import useAssetStore from 'stores/useAssetStore';
import useConstraintStore from 'stores/useConstraintStore';
import { useQuery } from '@tanstack/react-query';

const AssetConstraintList = ({ assets }) => {
	const [hasPortfolio, setHasPortfolio] = useState(false);
	const totalCash = useAssetStore(state => state.totalCash);
	const {
		lowerBounds,
		upperBounds,
		exactProportion,
		isLowerBoundExceeded,
		isUpperBoundUnderLimit,
		setLowerBound,
		setUpperBound,
		setExactProportion,
	} = useConstraintStore();

	useQuery({
		queryKey: ['portfolioList'],
		queryFn: fetchPortfolioList,
		onSuccess: data => {
			setHasPortfolio(data.hasPortfolio);
		},
	});

	const handleSubmit = () => {};

	return (
		<Box sx={{ height: '100%', position: 'relative' }}>
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
								defaultValue={totalCash}
							/>{' '}
							원
						</Box>
					</Tooltip>
					<Button flex={1}>만원</Button>
					<Button flex={1}>십만원</Button>
					<Button flex={1}>백만원</Button>
					<Button flex={1}>천만원</Button>
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
