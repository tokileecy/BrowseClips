import { ReactNode } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export interface MainProps {
  children?: ReactNode;
}

export default function Main(props: MainProps) {
  const { children } = props;

  return (
    <Box
      sx={(theme) => ({
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        height: `calc(100% -${theme.custom.headerHeight})`,
        overflow: 'auto',
      })}
    >
      <Container
        component="main"
        sx={(theme) => ({
          marginTop: theme.custom.headerHeight,
        })}
      >
        {children}
      </Container>
    </Box>
  );
}
