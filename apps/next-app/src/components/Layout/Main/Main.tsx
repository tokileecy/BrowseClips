import { ReactNode } from 'react';
import Container from '@mui/material/Container';

export interface MainProps {
  children?: ReactNode;
}

export default function Main(props: MainProps) {
  const { children } = props;

  return (
    <Container
      component="main"
      sx={(theme) => ({
        marginTop: theme.custom.headerHeight,
      })}
    >
      {children}
    </Container>
  );
}
