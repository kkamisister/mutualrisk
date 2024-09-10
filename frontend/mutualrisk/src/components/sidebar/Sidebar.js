import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import InsightsIcon from "@mui/icons-material/Insights";
import AddchartIcon from "@mui/icons-material/Addchart";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import SidebarItem from "components/sidebar/SidebarItem";
import { colors } from "constants/colors";

const SidebarItemInfoArray = [
  {
    title: "내 포트폴리오",
    icon: SpaceDashboardIcon,
    move: "/portfolio/detail",
  },
  {
    title: "리밸런싱",
    icon: InsightsIcon,
    move: "/portfolio/rebalance",
    clicked: false,
  },
  {
    title: "포트폴리오 제작",
    icon: AddchartIcon,
    move: "/portfolio/create",
    clicked: false,
  },
  {
    title: "관심 종목",
    icon: BookmarkIcon,
    move: "/stock/bookmark",
    clicked: false,
  },
  {
    title: "펀드 투자 목록",
    icon: QueryStatsIcon,
    move: "/fund",
    clicked: true,
  },
];

const Sidebar = () => {
  const [hover, setHover] = useState(false); // hover 상태 관리
  return (
    <Stack
      sx={{
        borderRight: "solid 1px",
        borderColor: `${colors.point.stroke}`,
        height: "100%",
        justifyContent: "flex-start",
        transition: "width 0.3s ease",
        alignItems: "center",
        padding: "10px",
        background: `${colors.background.primary}`,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Stack>
        {SidebarItemInfoArray.map((info) => (
          <SidebarItem
            title={info.title}
            Icon={info.icon}
            move={info.move}
            clicked={info.clicked}
            hover={hover}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Sidebar;
