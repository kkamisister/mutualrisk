import create from 'zustand';

const useConstraintStore = create(set => ({
	lowerBounds: [],
	upperBounds: [],
	exactProportion: [],
	isLowerBoundExceeded: false,
	isUpperBoundUnderLimit: false,

	// Lower bound 상태 업데이트 및 최솟값 합계 초과 여부 확인
	setLowerBound: (index, value) =>
		set(state => {
			const updatedLowerBounds = [...state.lowerBounds];
			updatedLowerBounds[index] = value !== '' ? parseFloat(value) / 100 : 0;
			const lowerSum = updatedLowerBounds.reduce(
				(sum, value) => sum + value * 100,
				0
			);
			return {
				lowerBounds: updatedLowerBounds,
				isLowerBoundExceeded: lowerSum > 100,
			};
		}),

	// Upper bound 상태 업데이트 및 최댓값 합계 부족 여부 확인
	setUpperBound: (index, value) =>
		set(state => {
			const updatedUpperBounds = [...state.upperBounds];
			updatedUpperBounds[index] = value !== '' ? parseFloat(value) / 100 : 1;
			const upperSum = updatedUpperBounds.reduce(
				(sum, value) => sum + value * 100,
				0
			);
			return {
				upperBounds: updatedUpperBounds,
				isUpperBoundUnderLimit: upperSum < 100,
			};
		}),

	// Exact proportion 상태 업데이트
	setExactProportion: (index, value) =>
		set(state => {
			const updatedProportion = [...state.exactProportion];
			updatedProportion[index] =
				value !== '' ? parseFloat(value) / 100 : null;
			return { exactProportion: updatedProportion };
		}),
}));

export default useConstraintStore;
