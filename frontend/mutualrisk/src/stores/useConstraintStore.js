import { create } from 'zustand';

const useConstraintStore = create(set => ({
	lowerBounds: [],
	upperBounds: [],
	exactProportion: [],
	isLowerBoundExceeded: false,
	isUpperBoundUnderLimit: false,

	// 초기화 함수: 자산의 길이에 맞춰 배열 길이 설정
	initialization: assetLength =>
		set(() => ({
			lowerBounds: new Array(assetLength).fill(0),
			upperBounds: new Array(assetLength).fill(1),
			exactProportion: new Array(assetLength).fill(null),
			isLowerBoundExceeded: false,
			isUpperBoundUnderLimit: false,
		})),

	setLowerBound: (index, value) =>
		set(state => {
			const updatedLowerBounds = [...state.lowerBounds];
			const newValue = value !== '' ? parseFloat(value) / 100 : 0;

			// 값이 유효하지 않은 경우 보호 조건
			if (isNaN(newValue)) return state;

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
			const newValue = value !== '' ? parseFloat(value) / 100 : 1;

			if (isNaN(newValue)) return state;

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
			const newValue = value !== '' ? parseFloat(value) / 100 : null;

			if (isNaN(newValue)) return state;

			updatedProportion[index] = newValue;
			return { exactProportion: updatedProportion };
		}),
}));

export default useConstraintStore;
