import React from "react";
import Stack from "@mui/material/Stack";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SidebarItem from "components/sidebar/SidebarItem";
import { colors } from "constants/colors";

const SidebarItemInfoArray = [
  { title: "myPortfolio", icon: SpaceDashboardIcon, move: "/portfolio" },
  { title: "myPortfolio", icon: SpaceDashboardIcon, move: "/portfolio" },
  { title: "myPortfolio", icon: SpaceDashboardIcon, move: "/portfolio" },
  { title: "myPortfolio", icon: SpaceDashboardIcon, move: "/portfolio" },
  { title: "myPortfolio", icon: SpaceDashboardIcon, move: "/portfolio" },
];
const Sidebar = () => {
  return (
    <Stack
      sx={{
        borderRight: "solid 1px",
        borderColor: `${colors.point.stroke}`,
        height: "100vh",
      }}
    >
      {SidebarItemInfoArray.map((info) => (
        <SidebarItem title={info.title} Icon={info.icon} move={info.move} />
      ))}
    </Stack>
  );
};

export default Sidebar;
