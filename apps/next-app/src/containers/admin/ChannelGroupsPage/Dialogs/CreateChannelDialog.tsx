import { SyntheticEvent, useMemo, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import { useListChannelsQuery } from '@/redux/services/nestApi';
import { Channel } from '@browse_clips/api';

export interface ChannelFormData {
  channelIds: string[];
}

export interface CreateChannelDialogProps {
  open: boolean;
  onOk?: (data: ChannelFormData) => void;
  onCancel?: () => void;
}

export default function CreateChannelDialog(props: CreateChannelDialogProps) {
  const { open, onOk, onCancel } = props;

  const {
    data: channels,
    error: listChannelsError,
    isLoading: isListChannelsLoading,
  } = useListChannelsQuery();

  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const handleAutoCompleteChange = (
    _event: SyntheticEvent<Element, Event>,
    option: string[],
  ) => {
    setSelectedChannels(option);
  };

  const channelMap = useMemo(() => {
    return (channels ?? []).reduce<Record<string, Channel>>((acc, channel) => {
      acc[channel.id] = channel;
      return acc;
    }, {} as Record<string, Channel>);
  }, [channels]);

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
          setSelectedChannels([]);
        },
      }}
      onClose={() => {
        onCancel?.();
      }}
    >
      <DialogTitle>Add Channel</DialogTitle>
      <DialogContent>
        {!listChannelsError && !isListChannelsLoading ? (
          <>
            <Autocomplete
              multiple
              id="tags-filled"
              options={channels?.map((channel) => channel.id) ?? []}
              value={selectedChannels}
              onChange={handleAutoCompleteChange}
              defaultValue={[]}
              freeSolo
              getOptionLabel={(option) => {
                return channelMap[option]?.title ?? option;
              }}
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  // eslint-disable-next-line react/jsx-key
                  <Chip
                    variant="outlined"
                    label={channelMap[option]?.title ?? option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="ChannelIds"
                  placeholder="ChannelIds"
                />
              )}
            />
          </>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="text"
          color="primary"
          onClick={() => {
            onOk?.({
              channelIds: selectedChannels,
            });
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
