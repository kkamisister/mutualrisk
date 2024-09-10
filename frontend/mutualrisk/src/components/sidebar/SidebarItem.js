import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { colors } from "constants/colors";
import { useNavigate } from "react-router-dom";
const SidebarItem = ({ title, Icon, move, clicked, hover }) => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "flex-center",
        alignItems: "center",
        width: hover ? "155px" : "30px",
        height: "31px",
        padding: "7px 7px 7px 10px",
        margin: "5px",
        cursor: "pointer",
        fontWeight: clicked ? "bold" : "normal",
        color: clicked ? colors.main.primary2 : colors.text.main,
        backgroundColor: clicked ? colors.main.sub : "",
        transition:
          "background-color 0.3s ease, color 0.3s ease, width 0.3s ease", // 부드러운 애니메이션
        overflow: "hidden", // 텍스트가 넘칠 때 숨김 처리
        whiteSpace: "nowrap", // 텍스트를 한 줄로 유지
        "&:hover": clicked
          ? {
              backgroundColor: colors.main.primary,
            }
          : {
              backgroundColor: colors.background.box,
            },
        borderRadius: "10px",
      }}
      onClick={() => {
        navigate(move);
      }}
    >
      <Icon sx={{ width: "24px", height: "24px" }} />
      {hover && <Box>&nbsp;&nbsp;{title}</Box>}
    </Stack>
  );
};

export default SidebarItem;
