import {
  useAddChannelByIdsMutation,
  useCreateChannelGroupMutation,
  useListChannelGroupsQuery,
} from '@/redux/services/nestApi';
import { Avatar, IconButton, ListItemAvatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Layout from '@/components/Layout';
import { Fragment, useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CreateChannelGroupDialog, {
  ChannelGroupFormData,
} from './Dialogs/CreateGroupDialog';
import Title from './Title';
import CreateChannelDialog, {
  ChannelFormData,
} from './Dialogs/CreateChannelDialog';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function ChannelGroupsPage() {
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);

  const [targetGroupName, setTartgetGroupName] = useState<string | undefined>(
    undefined,
  );

  const [expandByItemId, setExpandByItemId] = useState<Record<number, boolean>>(
    {},
  );

  const {
    data: channelGroups,
    error,
    isLoading,
    refetch: refetchChannelGroups,
  } = useListChannelGroupsQuery({
    withVideos: '1',
  });

  const [createChannelGroup] = useCreateChannelGroupMutation();
  const [addChannelById] = useAddChannelByIdsMutation();

  const handleCreateGroup = () => {
    setGroupDialogOpen(true);
  };

  const jwt = useSelector((state: RootState) => state.auth.jwt);

  const isLogin = jwt !== undefined;

  const handleGroupDialogOk = async (form: ChannelGroupFormData) => {
    try {
      await createChannelGroup(form);
      await refetchChannelGroups();
      setGroupDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGroupDialogCancel = () => {
    setGroupDialogOpen(false);
  };

  const [channelDialogOpen, setChannelDialogOpen] = useState(false);

  const handleChannelDialogOk = async (form: ChannelFormData) => {
    try {
      await addChannelById({
        ids: form.channelIds?.split(','),
        groupName: targetGroupName,
      });
      await refetchChannelGroups();
      setChannelDialogOpen(false);
      setTartgetGroupName(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateChannelToChannelGroup = (groupName: string) => {
    setChannelDialogOpen(true);
    setTartgetGroupName(groupName);
  };

  const handleChannelDialogCancel = () => {
    setChannelDialogOpen(false);
    setTartgetGroupName(undefined);
  };

  const handleListItemClick = (id: number, expand: boolean) => {
    setExpandByItemId((prev) => ({ ...prev, [id]: expand }));
  };

  return (
    <Layout>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isLogin && (
          <Title text="ChannelGroups" onIconClick={handleCreateGroup} />
        )}
        <Box
          sx={{
            columnGap: 2,
            rowGap: 2,
            pt: 2,
          }}
        >
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              cursor: 'pointer',
            }}
            component="ul"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                ChannelGroups
              </ListSubheader>
            }
          >
            {!isLoading &&
              !error &&
              channelGroups !== undefined &&
              channelGroups.map((channelGroups) => {
                return (
                  <Fragment key={channelGroups.id}>
                    <ListItemButton
                      onClick={() => {
                        console.log(channelGroups.id);
                        handleListItemClick(
                          channelGroups.id,
                          !expandByItemId[channelGroups.id],
                        );
                      }}
                    >
                      <ListItemText primary={channelGroups.name} />
                      {isLogin && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCreateChannelToChannelGroup(
                              channelGroups.name,
                            );
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      )}
                      {expandByItemId[channelGroups.id] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={expandByItemId[channelGroups.id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {channelGroups.channels.map((channel) => {
                          return (
                            <ListItemButton
                              sx={{ pl: 4 }}
                              key={channel.channel.id}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  alt={channel.channel.title}
                                  src={
                                    channel.channel.thumbnails.default.url ??
                                    channel.channel.thumbnails.standard.url
                                  }
                                />
                              </ListItemAvatar>
                              <ListItemText primary={channel.channel.title} />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  </Fragment>
                );
              })}
          </List>
        </Box>

        <CreateChannelGroupDialog
          open={groupDialogOpen}
          onOk={handleGroupDialogOk}
          onCancel={handleGroupDialogCancel}
        />
        <CreateChannelDialog
          open={channelDialogOpen}
          onOk={handleChannelDialogOk}
          onCancel={handleChannelDialogCancel}
        />
      </Box>
    </Layout>
  );
}
