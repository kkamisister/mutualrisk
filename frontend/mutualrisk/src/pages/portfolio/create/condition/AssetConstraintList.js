import { useState } from 'react';
import { Box, Input, Tooltip, Stack } from '@mui/material';
import BasicButton from 'components/button/BasicButton';
import BasicChip from 'components/chip/BasicChip';
import { colors } from 'constants/colors';
import AssetInputModal from 'pages/portfolio/create/AssetInputModal';
import { createPortfolio } from 'utils/apis/portfolio';

const AssetConstraintList = ({ assets }) => {
	const [openInputModal, setOpenInputModal] = useState(false);
	const [lowerBounds, setLowerBounds] = useState(Array(assets.length).fill(0));
	const [upperBounds, setUpperBounds] = useState(Array(assets.length).fill(1));
	const [exactProportion, setExactProportion] = useState(
		Array(assets.length).fill(null)
	);

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
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					gap: 2,
				}}>
				<BasicChip label="종목 이름" />
				<BasicChip label="최솟값 (%)" />
				<BasicChip label="최댓값 (%)" />
				<BasicChip label="지정 비율 (%)" />
			</Box>

			{/* 스크롤 가능한 영역 */}
			<Box
				sx={{
					pt: 2,
					height: 'calc(100% - 100px)',
					overflowY: 'auto',
					'&::-webkit-scrollbar': { display: 'none' }, // 스크롤바 숨기기
					msOverflowStyle: 'none', // IE 및 Edge에서 스크롤바 숨기기
					scrollbarWidth: 'none', // Firefox에서 스크롤바 숨기기
				}}>
				<Stack spacing={2}>
					{assets.map((asset, index) => (
						<Box
							key={asset.assetId}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								flexWrap: 'nowrap',
							}}>
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

							<Box sx={{ flex: 1, mx: 1 }}>
								{/* 최솟값 */}
								<Input
									fullWidth
									type="number"
									defaultValue={0}
									onChange={e =>
										handleLowerChange(index, e.target.value)
									}
								/>
							</Box>

							<Box sx={{ flex: 1, mx: 1 }}>
								{/* 최댓값 */}
								<Input
									type="number"
									defaultValue={100}
									onChange={e =>
										handleUpperChange(index, e.target.value)
									}
								/>
							</Box>

							<Box sx={{ flex: 1, mx: 1 }}>
								{/* 지정비율 */}
								<Input
									type="number"
									defaultValue=""
									onChange={e =>
										handleExactChange(index, e.target.value)
									}
								/>
							</Box>
						</Box>
					))}
				</Stack>
			</Box>

			{/* 하단 버튼 */}
			<Box
				sx={{
					position: 'absolute',
					left: '50%',
					bottom: 0,
					transform: 'translateX(-50%)',
				}}>
				<BasicButton text="포트폴리오 제작하기" onClick={handleSubmit} />
			</Box>

			{openInputModal && (
				<AssetInputModal
					open={openInputModal}
					onClose={() => setOpenInputModal(false)}
				/>
			)}
		</Box>
	);
};

export default AssetConstraintList;
