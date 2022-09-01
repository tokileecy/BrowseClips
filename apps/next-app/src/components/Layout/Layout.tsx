import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setAuth } from '@/redux/features/auth';
import { RootState } from '@/redux/store';
import api from '@/api';
import Header from './Header';
import Main from './Main';
import Aside from './Aside';
import Box from '@mui/material/Box';

export interface LayoutProps {
  variant?: 'common' | 'login';
  children?: ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children, variant = 'common' } = props;

  const [isStartup, setIsStartup] = useState(false);
  const rememberMe = useSelector((state: RootState) => state.auth.rememberJwt);
  const jwt = useSelector((state: RootState) => state.auth.jwt);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const localJwt = localStorage.getItem('jwt');

    if (jwt !== undefined) {
      api.setJwt(jwt);

      if (rememberMe && jwt !== localJwt) {
        localStorage.setItem('jwt', jwt);
      }
    } else {
      if (localJwt) {
        dispatch(setAuth({ jwt: localJwt }));
        api.setJwt(localJwt);
      }
    }

    if (!isStartup) {
      setIsStartup(true);
    }
  }, [jwt]);

  useEffect(() => {
    const getUserProfile = async () => {
      if (variant === 'common') {
        try {
          await api.getUserProfile();
        } catch {
          localStorage.removeItem('jwt');
          router.push('/login');
        }
      }
    };

    if (isStartup) {
      getUserProfile();
    }
  }, [isStartup, variant]);

  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          height: '100%',
        }}
      >
        {variant === 'common' && <Aside />}
        {variant === 'common' ? (
          <Main>{children}</Main>
        ) : (
          <Box
            component="main"
            sx={{
              margin: 'auto',
            }}
          >
            {children}
          </Box>
        )}
        {/* <Main>{children}</Main> */}
      </Box>
    </>
  );
}
