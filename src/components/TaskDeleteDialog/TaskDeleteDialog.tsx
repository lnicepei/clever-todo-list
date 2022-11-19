import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type Props = {
  isDialogOpen: boolean;
  taskName: string;
  closeDialog: () => void;
  deleteTask: () => void;
};

const TaskDeleteDialog: React.FC<Props> = ({
  isDialogOpen,
  closeDialog,
  taskName,
  deleteTask,
}) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Delete task ${taskName}?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={deleteTask} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDeleteDialog;
