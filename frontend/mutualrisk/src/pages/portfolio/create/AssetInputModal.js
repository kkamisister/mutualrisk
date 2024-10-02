import { Modal, Box, Button, TextField, Stack } from '@mui/material';
import { useState } from 'react';
import useAssetStore from 'stores/useAsssetStore';

const AssetInputModal = ({ open, handleClose }) => {
	const [assetValue, setAssetValue] = useState(''); // 자산 입력 상태 관리
	const [error, setError] = useState(false); // 오류 상태 관리

	const addAsset = useAssetStore(state => state.addAsset); // Zustand의 addAsset 함수 가져오기

	// 자산 입력 핸들러 (쉼표 추가)
	const handleChange = e => {
		let value = e.target.value.replace(/,/g, ''); // 쉼표 제거 후 숫자 변환
		if (!isNaN(value) && value >= 0) {
			setAssetValue(Number(Math.floor(value)).toLocaleString()); // 숫자로 변환 후 쉼표 추가
			if (error) setError(false); // 오류 해제
		} else {
			setError(true); // 숫자가 아니거나 음수일 경우 오류
		}
	};

	// 금액 버튼 클릭 시 자산에 해당 금액 더하기
	const handleAmountClick = amount => {
		let currentValue = assetValue.replace(/,/g, '') || 0; // 현재 자산 값에서 쉼표 제거
		let newValue = Number(currentValue) + amount;
		setAssetValue(newValue.toLocaleString()); // 금액 더한 후 쉼표 추가
	};

	// 확인 버튼 클릭 핸들러
	const handleConfirm = () => {
		let value = parseFloat(assetValue.replace(/,/g, '')); // 쉼표 제거 후 숫자로 변환
		if (!value || isNaN(value) || value <= 0) {
			setError(true); // 자산 값이 없거나 잘못된 값이면 오류
			return;
		}

		// Zustand에 자산 값 저장
		addAsset({
			id: Date.now(), // 고유 ID
			value: value, // 숫자로 변환 후 저장
		});

		// 상태 초기화 및 모달 닫기
		setAssetValue('');
		handleClose();
	};

	return (
		<Modal
			open={open}
			onClose={() => {
				if (!assetValue || error) return; // 자산 입력이 없으면 닫히지 않음
				handleClose();
			}}
			aria-labelledby="asset-input-modal"
			aria-describedby="modal-to-input-asset-value">
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					p: 3,
					backgroundColor: 'white',
					borderRadius: 2,
					minWidth: 300,
				}}>
				<h2>자산 입력</h2>
				<TextField
					label="자산 (원)"
					type="text"
					value={assetValue}
					onChange={handleChange}
					fullWidth
					error={error}
					helperText={error ? '유효한 자산 금액을 입력하세요' : ''}
				/>
				{/* 금액 버튼 추가 */}
				<Stack direction="row" spacing={1} mt={2}>
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
				<Button
					variant="contained"
					onClick={handleConfirm}
					sx={{ mt: 2 }}
					fullWidth>
					확인
				</Button>
			</Box>
		</Modal>
	);
};

export default AssetInputModal;
