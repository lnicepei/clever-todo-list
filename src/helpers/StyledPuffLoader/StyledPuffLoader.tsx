import { PuffLoader } from "react-spinners";

import { Box, useTheme } from "@mui/material";

const StyledPuffLoader = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <PuffLoader color={theme.palette.primary.main} />
    </Box>
  );
};

export default StyledPuffLoader;
