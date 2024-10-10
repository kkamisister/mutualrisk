import { Modal, Button, TextField, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import useAssetStore from 'stores/useAssetStore';
import CloseIcon from '@mui/icons-material/Close';
import { colors } from 'constants/colors';
import { useQuery } from '@tanstack/react-query';
import { fetchPortfolioList } from 'utils/apis/analyze';

const AssetInputModal = ({ open, handleClose, child }) => {
	const addTotalCash = useAssetStore(state => state.addTotalCash);
	const [assetValue, setAssetValue] = useState('');
	const [displayValue, setDisplayValue] = useState(''); // 화면에 표시할 값
	const [error, setError] = useState(false);

	const { data } = useQuery({
		queryKey: ['portfolioList'],
		queryFn: fetchPortfolioList,
	});

	useState(() => {
		if (data.hasPorfolio) {
			const initialValue = data.recentValuation.toLocaleString();
			setAssetValue(initialValue);
			setDisplayValue(initialValue);
		}
	}, [data]);

	const handleChange = e => {
		const value = e.target.value.replace(/,/g, ''); // 쉼표 제거한 값
		setDisplayValue(
			value === '' ? '' : Number(value).toLocaleString() // 쉼표 없는 숫자도 허용
		);

		// 숫자만 포함하고 0 이상인 경우에만 assetValue 업데이트
		if (/^\d*$/.test(value) && Number(value) >= 0) {
			setAssetValue(value === '' ? '' : Number(value).toLocaleString());
			setError(false);
		} else {
			setError(true); // 유효하지 않은 입력은 에러 표시
		}
	};

	const handleAmountClick = amount => {
		const currentValue = parseInt(assetValue.replace(/,/g, ''), 10) || 0;
		const newValue = currentValue + amount;
		const newValueStr = newValue.toLocaleString();

		setAssetValue(newValue);
		setDisplayValue(newValueStr);
	};

	const handleConfirm = () => {
		const value = assetValue;

		if (!value || isNaN(value) || value <= 0) {
			setError(true);
			return;
		}

		addTotalCash(value);
		setAssetValue('');
		setDisplayValue('');

		handleClose();
	};

	return (
		<Modal
			open={open}
			onClose={() => {
				handleClose();
			}}
			aria-labelledby="asset-input-modal"
			aria-describedby="modal-to-input-asset-value">
			<Stack
				spacing={1}
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					p: 3,
					borderRadius: 2,
					minWidth: 300,
					bgcolor: colors.background.white,
				}}>
				<Stack direction="row" justifyContent="space-between">
					<Typography sx={{ fontWeight: 'bold' }}>자산 입력</Typography>
					<CloseIcon
						onClick={handleClose}
						sx={{
							fontSize: '16px',
							color: colors.text.sub2,
							'&:hover': {
								color: colors.text.main,
							},
						}}
					/>
				</Stack>
				<TextField
					label="자산 (원)"
					type="text"
					value={displayValue} // 입력한 그대로 표시
					onChange={handleChange}
					fullWidth
					error={error}
					helperText={error ? '유효한 자산 금액을 입력하세요' : ''}
				/>
				{/* 금액 버튼 추가 */}
				<Stack direction="row" spacing={1}>
					<Button
						variant="outlined"
						onClick={() => handleAmountClick(10000)}>
						1만 원
					</Button>
					<Button
						variant="outlined"
						onClick={() => handleAmountClick(100000)}>
						10만 원
					</Button>
					<Button
						variant="outlined"
						onClick={() => handleAmountClick(1000000)}>
						100만 원
					</Button>
					<Button
						variant="outlined"
						onClick={() => handleAmountClick(10000000)}>
						1000만 원
					</Button>
				</Stack>
				{child}
				<Button
					variant="contained"
					onClick={handleConfirm}
					sx={{ mt: 2 }}
					fullWidth>
					확인
				</Button>
			</Stack>
		</Modal>
	);
};

export default AssetInputModal;
