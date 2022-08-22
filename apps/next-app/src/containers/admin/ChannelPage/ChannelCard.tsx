import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

export interface ChannelCardProps {
  thumbnails: string;
  title: string;
  id: string;
  description: string;
}

export default function ChannelCard(props: ChannelCardProps) {
  const { thumbnails, id, title, description } = props;

  return (
    <Card
      sx={{
        width: '320px',
        whiteSpace: 'pre-wrap',
        lineBreak: 'anywhere',
        maxHeight: '400px',
        overflow: 'auto',
      }}
    >
      <CardContent
        sx={{
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Avatar
            sx={{
              display: 'flex',
              mr: 1,
            }}
            src={thumbnails}
          />
          <Typography
            color="text.secondary"
            sx={{
              fontSize: 18,
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
            gap: 1,
            mt: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {`Id: ${id}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
