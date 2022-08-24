import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import CircleAdd from '@/images/circle-add.svg';

export interface TitleProps {
  text: string;
  onIconClick?: () => void;
}

export default function Title(props: TitleProps) {
  const { text, onIconClick } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        {text}
      </Typography>
      <IconButton onClick={onIconClick}>
        <SvgIcon
          component={CircleAdd}
          sx={{ width: '20px', height: '20px', color: 'white' }}
        ></SvgIcon>
      </IconButton>
    </Box>
  );
}
