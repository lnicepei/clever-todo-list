import { PuffLoader } from "react-spinners";

import { useTheme } from "@mui/material";

import { StyledPuffLoaderBox } from "./style";

const CustomPuffLoader = () => {
  const theme = useTheme();

  return (
    <StyledPuffLoaderBox>
      <PuffLoader color={theme.palette.primary.main} />
    </StyledPuffLoaderBox>
  );
};

export default CustomPuffLoader;
