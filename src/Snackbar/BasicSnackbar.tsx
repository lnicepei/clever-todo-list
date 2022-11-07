import React, { forwardRef } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type SnackbarProps = {
  open: boolean;
  onClose:
    | ((
        event: Event | React.SyntheticEvent<any, Event>,
        reason?: SnackbarCloseReason
      ) => void)
    | undefined;
  message: string;
};

const BasicSnackbar: React.FC<SnackbarProps> = ({ open, onClose, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={3500} onClose={onClose}>
      <Alert onClose={onClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default BasicSnackbar;
