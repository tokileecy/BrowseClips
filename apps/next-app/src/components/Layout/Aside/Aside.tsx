import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import ListSubheader from '@mui/material/ListSubheader';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export interface AsideProps {
  asideOpen: boolean;
}

export default function Aside(props: AsideProps) {
  const { asideOpen } = props;

  const jwt = useSelector((state: RootState) => state.auth.jwt);

  const isLogin = jwt !== undefined;

  return (
    <Drawer
      variant="permanent"
      open={asideOpen}
      PaperProps={{
        sx: (theme) => ({
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          width: asideOpen ? theme.custom.asideWidth : 0,
          boxSizing: 'border-box',
          paddingTop: theme.custom.headerHeight,
        }),
      }}
      sx={(theme) => ({
        width: asideOpen ? theme.custom.asideWidth : 0,
        overflow: 'auto',
        flexShrink: 0,
        zIndex: 900,
      })}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {[
            { href: '/', text: 'Home' },
            // { href: '/video?category=Streamer', text: 'Videos' },
            // { href: '/video?category=Clipper', text: 'Clips' },
            { href: '/channel-groups', text: 'Channelgroups' },
          ].map(({ href, text }) => (
            <ListItem key={href} disablePadding>
              <ListItemButton href={href} component={Link}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {isLogin && (
          <List>
            <ListSubheader>
              <ListItemText primary={'Admin'} />
            </ListSubheader>
            {[
              { href: '/admin', text: 'Admin' },
              { href: '/admin/channel', text: 'Channel' },
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
        )}
      </Box>
    </Drawer>
  );
}
