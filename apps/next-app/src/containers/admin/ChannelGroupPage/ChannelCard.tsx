import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

export interface ChannelGroupCardProps {
  name: string;
}

export default function ChannelGroupCard(props: ChannelGroupCardProps) {
  const { name } = props;

  return (
    <Card
      sx={{
        width: '200px',
      }}
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
