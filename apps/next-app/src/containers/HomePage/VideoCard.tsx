import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

export interface VideoCardProps {
  imgUrl: string;
  userName: string;
  name: string;
  description: string;
}

export default function VideoCard(props: VideoCardProps) {
  const { imgUrl, name, userName, description } = props;

  return (
    <Card
      sx={{
        width: '300px',
      }}
    >
      <CardMedia
        component="img"
        height="150"
        width="300"
        image={imgUrl}
        alt={name}
      />
      <CardContent
        sx={{
          'display': 'flex',
          'pt': 2,
          'pb': 2,
          '&:last-child': {
            pt: 2,
            pb: 2,
          },
        }}
      >
        <Avatar
          sx={{
            mr: 1,
          }}
        >
          {userName}
        </Avatar>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            minHeight: '50px',
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
