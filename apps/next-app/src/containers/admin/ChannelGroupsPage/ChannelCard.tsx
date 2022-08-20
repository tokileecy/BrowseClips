import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

export interface ChannelGroupCardProps {
  name: string;
  onClick?: () => void;
}

export default function ChannelGroupCard(props: ChannelGroupCardProps) {
  const { name, onClick } = props;

  return (
    <Card
      sx={{
        width: '200px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          fontWeight: 'bold',
          fontSize: '20px',
          p: 2,
        }}
      >
        {name}
      </Box>
    </Card>
  );
}
