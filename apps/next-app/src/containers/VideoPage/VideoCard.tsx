import Link from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

export interface VideoCardProps {
  id: string;
  thumbnails: string;
  title: string;
  description: string;
}

export default function VideoCard(props: VideoCardProps) {
  const { id, thumbnails, title } = props;

  return (
    <Card
      data-vedio-id={id}
      sx={{
        width: '250px',
        height: '100%',
      }}
    >
      <Link href={`/video/${id}`}>
        <Box component="a" sx={{ cursor: 'pointer' }}>
          <CardMedia
            component="img"
            height="120"
            width="250"
            image={thumbnails}
            alt="vedio"
          />
        </Box>
      </Link>
      <CardContent
        sx={{
          'display': 'flex',
          'flexDirection': 'column',
          'pt': 2,
          'pb': 2,
          '&:last-child': {
            pt: 2,
            pb: 2,
          },
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            minHeight: '50px',
            fontWeight: 'bold',
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
