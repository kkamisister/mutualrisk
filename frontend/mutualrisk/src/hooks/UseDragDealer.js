import { useRef, useCallback } from 'react';

const useDragDealer = () => {
	const dragState = useRef({
		clicked: false,
		dragging: false,
		position: 0,
	});

	const dragStart = useCallback(ev => {
		dragState.current.position = ev.clientX;
		dragState.current.clicked = true;
	}, []);

	const dragStop = useCallback(() => {
		window.requestAnimationFrame(() => {
			dragState.current.dragging = false;
			dragState.current.clicked = false;
		});
	}, []);

	const dragMove = useCallback((ev, cb) => {
		const newDiff = dragState.current.position - ev.clientX;
		const movedEnough = Math.abs(newDiff) > 5;

		if (dragState.current.clicked && movedEnough) {
			dragState.current.dragging = true;
		}

		if (dragState.current.dragging && movedEnough) {
			dragState.current.position = ev.clientX;
			cb(newDiff);
		}
	}, []);

	return {
		dragStart,
		dragStop,
		dragMove,
	};
};

export default useDragDealer;
