import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import InsightsIcon from '@mui/icons-material/Insights';
import AddchartIcon from '@mui/icons-material/Addchart';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

import SidebarItem from 'components/sidebar/SidebarItem';
import { colors } from 'constants/colors';

const SidebarItemInfoArray = [
	{
		title: '내 포트폴리오',
		icon: SpaceDashboardIcon,
		move: '/portfolio/detail',
		sub: ['/portfolio/detail'],
		clicked: true,
	},
	{
		title: '리밸런싱',
		icon: InsightsIcon,
		move: '/rebalance',
		sub: ['/rebalance'],
		clicked: false,
	},
	{
		title: '포트폴리오 제작',
		icon: AddchartIcon,
		move: '/portfolio/create',
		sub: ['/portfolio/create'],
		clicked: false,
	},
	{
		title: '관심 종목',
		icon: BookmarkIcon,
		move: '/stock/bookmark',
		sub: ['/stock/bookmark', '/stock/detail'],
		clicked: false,
	},
	{
		title: '펀드 투자 목록',
		icon: QueryStatsIcon,
		move: '/fund/list',
		sub: ['/fund/list', '/fund/detail'],
		clicked: false,
	},
];

const Sidebar = ({ onHoverChange }) => {
	const location = useLocation();
	const [hover, setHover] = useState(false);

	// hover 상태를 상위 컴포넌트로 전달
	const handleMouseEnter = () => {
		setHover(true);
		onHoverChange(true); // 상위 컴포넌트로 hover 상태 전달
	};

	const handleMouseLeave = () => {
		setHover(false);
		onHoverChange(false); // 상위 컴포넌트로 hover 상태 전달
	};
	return (
		<Stack
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				borderRight: 'solid 1px',
				borderColor: `${colors.point.stroke}`,
				backgroundColor: colors.background.primary,
				justifyContent: 'flex-start',
				transition: 'width 0.3s ease',
				alignItems: 'center',
				width: hover ? '200px' : '73px', // hover 시 Sidebar의 너비 변경
				height: '100%',
				zIndex: '5',
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<Stack
				sx={{
					padding: '10px',
				}}>
				{SidebarItemInfoArray.map(info => {
					return (
						<SidebarItem
							title={info.title}
							Icon={info.icon}
							move={info.move}
							clicked={info.sub.some(subPath =>
								location.pathname.includes(subPath)
							)}
							hover={hover}
							key={info.move}
						/>
					);
				})}
			</Stack>
		</Stack>
	);
};

export default Sidebar;
