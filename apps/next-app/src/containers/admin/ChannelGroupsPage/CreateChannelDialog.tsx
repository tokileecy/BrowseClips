import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';

export interface ChannelFormData {
  channelIds: string;
}

export interface CreateChannelDialogProps {
  open: boolean;
  onOk?: (data: ChannelFormData) => void;
  onCancel?: () => void;
}

export default function CreateChannelDialog(props: CreateChannelDialogProps) {
  const { open, onOk, onCancel } = props;

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChannelFormData>();

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: (theme) => ({
          marginLeft: theme.spacing(4.5),
          marginRight: theme.spacing(4.5),
          [theme.breakpoints.up('mobile')]: {
            width: '100%',
          },
          [theme.breakpoints.up('laptop')]: {
            width: '405px',
          },
        }),
      }}
      TransitionProps={{
        onExited: () => {
          reset({
            channelIds: '',
          });
        },
      }}
      onClose={() => {
        onCancel?.();
      }}
    >
      <DialogTitle>Create Channel</DialogTitle>
      <DialogContent>
        <TextField
          label="ChannelIds"
          sx={{
            width: '100%',
          }}
          variant="standard"
          helperText={errors.channelIds?.message}
          {...register('channelIds', { required: true })}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="text"
          color="primary"
          onClick={handleSubmit((formData) => {
            onOk?.(formData);
          })}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
