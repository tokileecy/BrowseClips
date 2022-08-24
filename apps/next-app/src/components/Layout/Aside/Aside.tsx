import Drawer from '@mui/material/Drawer';
import ListSubheader from '@mui/material/ListSubheader';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';

const drawerWidth = 240;

export default function Aside() {
  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: (theme) => ({
          marginTop: theme.custom.headerHeight,
        }),
      }}
      sx={{
        overflow: 'auto',
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {[
            { href: '/', text: 'Home' },
            { href: '/video?category=Streamer', text: 'Videos' },
            { href: '/video?category=Clipper', text: 'Clips' },
          ].map(({ href, text }) => (
            <ListItem key={href} disablePadding>
              <Link href={href}>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListSubheader>
            <ListItemText primary={'Admin'} />
          </ListSubheader>
          {[
            { href: '/admin', text: 'Admin' },
            { href: '/admin/channel', text: 'Channel' },
            { href: '/admin/channel-groups', text: 'Channelgroups' },
          ].map(({ href, text }) => (
            <ListItem key={href} disablePadding>
              <Link href={href}>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListSubheader>
            <ListItemText primary={'ChannelGroups'} />
          </ListSubheader>
        </List>
      </Box>
    </Drawer>
  );
}
