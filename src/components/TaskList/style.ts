import {
  Box,
  BoxProps,
  Container,
  ContainerProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTaskListContainer = styled(Container)<ContainerProps>(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    "@media screen and (min-width: 500px)": {
      padding: `0 ${theme.spacing(2)}`,
    },
    "@media screen and (min-width: 900px)": {
      padding: `0`,
    },
  })
);

export const StyledTasksInfoBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  height: "40px",
  marginBottom: theme.spacing(1),
}));

export const StyledDayDescription = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    display: 'flex',
    alignItems: "center",
    marginRight: theme.spacing(1),
  })
);
