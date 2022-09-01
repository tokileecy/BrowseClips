import { useState } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { logout } from '@/redux/features/auth';
import { RootState } from '@/redux/store';
import LoginDialog from '../LoginDialog';

const { publicRuntimeConfig } = getConfig();

export interface HeaderProps {
  asideOpen: boolean;
  onAsideOpen?: () => void;
}

export default function Header(props: HeaderProps) {
  const { asideOpen, onAsideOpen } = props;
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const jwt = useSelector((state: RootState) => state.auth.jwt);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    dispatch(logout());
    router.push('/login');
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar
      sx={(theme) => ({
        marginLeft: asideOpen ? theme.custom.asideWidth : 'initail',
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        justifyContent: 'space-between',
        height: theme.custom.headerHeight,
      })}
    >
      <Toolbar
        sx={(theme) => ({
          ml: theme.custom.headerPaddingLeft,
          mr: theme.custom.headerPaddingRight,
          p: 0,
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <Box
          component="a"
          sx={{
            fontWeight: 'bold',
            width: 254,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onAsideOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {publicRuntimeConfig.BRAND_NAME}
        </Box>
        {!jwt ? (
          <Button variant="text">
            <Typography
              sx={{
                fontSize: '16px',
                color: 'white',
                fontWeight: 'bold',
              }}
              onClick={handleClickOpen}
            >
              Login
            </Typography>
          </Button>
        ) : (
          <Button variant="text">
            <Typography
              sx={{
                fontSize: '16px',
                color: 'white',
                fontWeight: 'bold',
              }}
              onClick={handleLogout}
            >
              Logout
            </Typography>
          </Button>
        )}
        <LoginDialog open={open} onClose={handleClose} />
      </Toolbar>
    </AppBar>
  );
}
