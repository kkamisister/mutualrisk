import { create } from 'zustand';

const useConstraintStore = create(set => ({
	lowerBounds: [],
	upperBounds: [],
	exactProportion: [],
	isLowerBoundExceeded: false,
	isUpperBoundUnderLimit: false,

	// 초기화 함수: 자산의 길이에 맞춰 배열 길이 설정
	initialization: assetLength =>
		set(state => {
			// 현재 상태 유지
			const { lowerBounds, upperBounds, exactProportion } = state;

			// 배열의 길이 조정
			const newLowerBounds = [
				...lowerBounds.slice(0, assetLength),
				...Array(Math.max(0, assetLength - lowerBounds.length)).fill(0),
			];

			const newUpperBounds = [
				...upperBounds.slice(0, assetLength),
				...Array(Math.max(0, assetLength - upperBounds.length)).fill(1),
			];

			const newExactProportion = [
				...exactProportion.slice(0, assetLength),
				...Array(Math.max(0, assetLength - exactProportion.length)).fill(
					null
				),
			];

			return {
				lowerBounds: newLowerBounds,
				upperBounds: newUpperBounds,
				exactProportion: newExactProportion,
				isLowerBoundExceeded:
					newLowerBounds.reduce((sum, value) => sum + value * 100, 0) >
					100,
				isUpperBoundUnderLimit:
					newUpperBounds.reduce((sum, value) => sum + value * 100, 0) <
					100,
			};
		}),

	setLowerBound: (index, value) =>
		set(state => {
			const updatedLowerBounds = [...state.lowerBounds];
			let newValue = value !== '' ? parseFloat(value) / 100 : 0;

			// 입력 값 조건 확인
			if (isNaN(newValue) || value === '.') newValue = 0;
			if (newValue < 0) newValue = 0;
			if (newValue > 1) newValue = 1;

			updatedLowerBounds[index] = newValue;
			const lowerSum = updatedLowerBounds.reduce(
				(sum, value) => sum + value * 100,
				0
			);

			return {
				lowerBounds: updatedLowerBounds,
				isLowerBoundExceeded: lowerSum > 100,
			};
		}),

	setUpperBound: (index, value) =>
		set(state => {
			const updatedUpperBounds = [...state.upperBounds];
			let newValue = value !== '' ? parseFloat(value) / 100 : 1;

			if (isNaN(newValue) || value === '.') newValue = 1;
			if (newValue < 0) newValue = 0;
			if (newValue > 1) newValue = 1;

			updatedUpperBounds[index] = newValue;
			const upperSum = updatedUpperBounds.reduce(
				(sum, value) => sum + value * 100,
				0
			);

			return {
				upperBounds: updatedUpperBounds,
				isUpperBoundUnderLimit: upperSum < 100,
			};
		}),

	setExactProportion: (index, value) =>
		set(state => {
			const updatedProportion = [...state.exactProportion];
			let newValue = value !== '' ? parseFloat(value) / 100 : null;

			if (isNaN(newValue) || value === '.') newValue = null;
			if (newValue < 0) newValue = 0;
			if (newValue > 1) newValue = 1;

			updatedProportion[index] = newValue;
			return { exactProportion: updatedProportion };
		}),
}));

export default useConstraintStore;
