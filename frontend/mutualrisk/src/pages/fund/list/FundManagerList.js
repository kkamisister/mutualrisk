import { useState, useRef, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FundManagerListItem from 'pages/fund/list/FundManagerListItem';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

const fundManagerSampleInfoList = [
	{
		fundId: 1,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 2,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 3,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 4,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 5,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 6,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 7,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 8,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 9,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 10,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 11,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 12,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 13,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 14,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
	{
		fundId: 11,
		name: '마이클 J 버리',
		capital: 316000000,
		imagePath:
			'https://i.namu.wiki/i/iTs3K_dL5pXXptDKo3axXbMpzhdhQi7f6y1XfdIbXrGvnIiod03r7uewR9iq55d5lsGQC-v3TLZNy10gmXK2bg.webp',
		clicked: false,
	},
];
class DragDealer {
	constructor() {
		this.clicked = false;
		this.dragging = false;
		this.position = 0;
	}

	dragStart = ev => {
		this.position = ev.clientX;
		this.clicked = true;
	};

	dragStop = () => {
		window.requestAnimationFrame(() => {
			this.dragging = false;
			this.clicked = false;
		});
	};

	dragMove = (ev, cb) => {
		const newDiff = this.position - ev.clientX;

		const movedEnough = Math.abs(newDiff) > 5;

		if (this.clicked && movedEnough) {
			this.dragging = true;
		}

		if (this.dragging && movedEnough) {
			this.position = ev.clientX;
			cb(newDiff);
		}
	};
}

function onWheel(apiObj, ev) {
	// NOTE: no good standart way to distinguish touchpad scrolling gestures
	// but can assume that gesture will affect X axis, mouse scroll only Y axis
	// of if deltaY too small probably is it touchpad
	const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

	if (isThouchpad) {
		ev.stopPropagation();
		return;
	}

	if (ev.deltaY < 0) {
		apiObj.scrollNext();
	} else {
		apiObj.scrollPrev();
	}
}
const FundManagerList = () => {
	const [fundManagerInfoList] = useState(() => fundManagerSampleInfoList);
	const dragState = useRef(new DragDealer());
	const handleDrag =
		({ scrollContainer }) =>
		ev =>
			dragState.current.dragMove(ev, posDiff => {
				if (scrollContainer.current) {
					scrollContainer.current.scrollLeft += posDiff;
				}
			});
	const onMouseDown = useCallback(
		() => dragState.current.dragStart,
		[dragState]
	);
	const onMouseUp = useCallback(() => dragState.current.dragStop, [dragState]);

	return (
		<Box
			onMouseLeave={dragState.current.dragStop}
			sx={{
				'& .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar':
					{
						display: 'none',
					},
				'& .react-horizontal-scrolling-menu--scroll-container': {
					scrollbarWidth: 'none',
					'-ms-overflow-style': 'none',
				},
			}}>
			<ScrollMenu
				onMouseDown={onMouseDown}
				onMouseUp={onMouseUp}
				onMouseMove={handleDrag}
				onWheel={onWheel}>
				{/* <Stack
					direction="row"
					spacing={1}
					sx={{
						width: '100%',
						overflowX: 'auto',
						whiteSpace: 'nowrap',
						'&::-webkit-scrollbar': {
							display: 'none',
						},
					}}> */}

				{fundManagerInfoList.map(info => (
					<FundManagerListItem
						name={info.name}
						capital={info.capital}
						imagePath={info.imagePath}
						id={info.fundId}
						clicked={info.clicked}
					/>
				))}
				{/* </Stack> */}
			</ScrollMenu>
		</Box>
	);
};

export default FundManagerList;
