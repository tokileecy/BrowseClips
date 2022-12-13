import { ReactNode, useCallback, useRef } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export interface MainProps {
  children?: ReactNode;
  onScrollToBottom?: () => void;
}

export default function Main(props: MainProps) {
  const { children, onScrollToBottom } = props;

  const handleScrollToBottomRef = useRef<() => void>();

  const mainRef = useRef<HTMLDivElement>();

  handleScrollToBottomRef.current = onScrollToBottom;

  const mainEndRefCallback = useCallback((element: HTMLDivElement) => {
    if (!mainRef.current) {
      mainRef.current = element;

      const intersectionObserver = new IntersectionObserver(function (entries) {
        if (entries[0].intersectionRatio <= 0) return;
        handleScrollToBottomRef.current?.();
      });

      intersectionObserver.observe(mainRef.current);
    }
  }, []);

  return (
    <Box
      sx={(theme) => ({
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.custom.headerHeight,
        height: `calc(100% - ${theme.custom.headerHeight})`,
        overflow: 'auto',
      })}
    >
      <Container
        component="main"
        sx={{
          marginTop: 0,
          padding: '32px 0',
        }}
      >
        {children}
        <Box
          sx={{
            width: '100%',
            transform: 'translateY(-50vh)',
          }}
          ref={mainEndRefCallback}
        ></Box>
      </Container>
    </Box>
  );
}
