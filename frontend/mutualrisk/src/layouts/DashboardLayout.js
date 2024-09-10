import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Sidebar from "components/sidebar/Sidebar";
import { colors } from "constants/colors";

const DashboardLayout = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: `${colors.background.primary}`,
      }}
    >
      <Stack direction="row">
        <Sidebar></Sidebar>
      </Stack>
    </Box>
  );
};

export default DashboardLayout;
