import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

interface Props {
  open: boolean;
  setOpen: (newState: boolean) => void;
  message: string;
  clickYesCallback: () => void;
  clickNoCallback: () => void;
}
function YesNoModal({ open, setOpen, message, clickYesCallback, clickNoCallback }: Props) {
  const handleYes = () => {
    clickYesCallback();
    handleClose();
  };
  const handleNo = () => {
    clickNoCallback();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleYes}>예</Button>
        <Button onClick={handleNo} autoFocus>
          아니오
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default YesNoModal;
