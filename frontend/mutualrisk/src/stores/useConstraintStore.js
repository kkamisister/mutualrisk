import { create } from 'zustand';

const useConstraintStore = create(set => ({
	lowerBounds: [],
	upperBounds: [],
	exactProportion: [],

	initializeConstraints: length =>
		set(state => {
			console.log('Initializing constraints with length:', length);

			const lowerBounds = [...state.lowerBounds.slice(0, length)];
			const upperBounds = [...state.upperBounds.slice(0, length)];
			const exactProportion = [...state.exactProportion.slice(0, length)];

			// 기존 값을 유지하고 필요한 만큼만 기본값 추가
			while (lowerBounds.length < length) {
				lowerBounds.push(0); // 또는 필요한 기본값
			}
			while (upperBounds.length < length) {
				upperBounds.push(100); // 또는 필요한 기본값
			}
			while (exactProportion.length < length) {
				exactProportion.push(null);
			}

			const newState = { lowerBounds, upperBounds, exactProportion };
			console.log('Updated State:', newState);
			return newState;
		}),

	// 특정 인덱스의 값을 설정하는 함수
	setLowerBound: (index, value) =>
		set(state => {
			const newLowerBounds = [...state.lowerBounds];
			newLowerBounds[index] = value;
			return { lowerBounds: newLowerBounds };
		}),

	setUpperBound: (index, value) =>
		set(state => {
			const newUpperBounds = [...state.upperBounds];
			newUpperBounds[index] = value;
			return { upperBounds: newUpperBounds };
		}),

	setExactProportion: (index, value) =>
		set(state => {
			const newExactProportion = [...state.exactProportion];
			newExactProportion[index] = value;
			return { exactProportion: newExactProportion };
		}),
}));

export default useConstraintStore;
