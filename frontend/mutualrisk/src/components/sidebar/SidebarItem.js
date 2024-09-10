import React from "react";
import Box from "@mui/material/Box";
import { colors } from "constants/colors";
const SidebarItem = ({ title, Icon, move }) => {
  console.log(colors.text.icon);
  return (
    <Box sx={{ width: "42px", height: "42px", padding: "8px" }}>
      <Icon sx={{ width: "100%", height: "100%", color: colors.text.icon }} />
    </Box>
  );
};

export default SidebarItem;
