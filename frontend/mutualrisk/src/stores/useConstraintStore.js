import { create } from 'zustand';

const useConstraintStore = create(set => ({
	lowerBounds: [],
	upperBounds: [],
	exactProportion: [],

	// 자산 길이에 따라 초기 제약 조건 설정
	initializeConstraints: length =>
		set(state => {
			console.log('Initializing constraints with length:', length);
			const newState = {
				lowerBounds: Array(length).fill(0),
				upperBounds: Array(length).fill(100),
				exactProportion: Array(length).fill(null),
			};
			console.log('New State:', newState);
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
