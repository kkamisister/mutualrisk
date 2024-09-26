import React, { useRef, useCallback } from 'react';
import { Box } from '@mui/material';
import useDragDealer from 'hooks/UseDragDealer';

// onWheel 함수 적용
const onWheel = (ev, containerRef) => {
	const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
	if (isThouchpad) {
		ev.stopPropagation();
		return;
	}

	if (containerRef.current) {
		if (ev.deltaY < 0) {
			containerRef.current.scrollLeft += 100; // 스크롤 이동
		} else {
			containerRef.current.scrollLeft -= 100; // 스크롤 이동
		}
	}
};

const HorizontalScrollContainer = ({ children }) => {
	const containerRef = useRef(null);
	const { dragStart, dragStop, dragMove } = useDragDealer(); // 드래그 이벤트 관리

	const handleDragMove = useCallback(
		diff => {
			if (containerRef.current) {
				containerRef.current.scrollLeft += diff; // 드래그에 따른 스크롤 이동
			}
		},
		[containerRef]
	);

	return (
		<Box
			ref={containerRef} // 컨테이너 참조
			onMouseDown={dragStart} // 드래그 시작
			onMouseUp={dragStop} // 드래그 종료
			onMouseLeave={dragStop} // 마우스 영역 벗어나면 드래그 종료
			onMouseMove={ev => dragMove(ev, handleDragMove)} // 마우스 이동에 따른 드래그
			onWheel={ev => onWheel(ev, containerRef)} // 스크롤 휠에 따른 스크롤 이동
			sx={{
				display: 'flex',
				overflowX: 'auto', // 수평 스크롤 가능하게 설정
				scrollbarWidth: 'none', // 기본 스크롤바 숨기기 (Firefox)
				'-ms-overflow-style': 'none', // 기본 스크롤바 숨기기 (IE/Edge)
				'&::-webkit-scrollbar': { display: 'none' }, // 기본 스크롤바 숨기기 (Chrome/Safari)
				'& > *': {
					// 자식 요소에 flex-shrink: 0을 적용
					flexShrink: 0,
				},
			}}>
			{children}
		</Box>
	);
};

export default HorizontalScrollContainer;
