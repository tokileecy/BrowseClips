import Link from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

export interface VideoCardProps {
  isLive?: boolean;
  id: string;
  thumbnails: string;
  title?: string;
}

export default function VideoCard(props: VideoCardProps) {
  const { id, thumbnails, title = '', isLive = false } = props;

  return (
    <Card
      data-vedio-id={id}
      sx={{
        width: '250px',
        height: '100%',
      }}
    >
      <Link href={`/video/${id}`}>
        <Box
          component="a"
          sx={{
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <CardMedia
            component="img"
            height="120"
            width="250"
            image={thumbnails}
            alt="vedio"
          />
          {isLive && (
            <Box
              sx={{
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'rgba(204, 0, 0, 0.9)',
                color: 'white',
                fontWeight: 'bold',
                borderTopLeftRadius: 4,
                pt: 0,
                pb: 0,
                pl: 1.25,
                pr: 1.25,
              }}
            >
              Live
            </Box>
          )}
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
