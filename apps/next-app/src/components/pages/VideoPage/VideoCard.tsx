import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'

export interface VideoCardProps {
  id: string
  thumbnails: string
  title: string
  description: string
}

const VideoCard = (props: VideoCardProps): JSX.Element => {
  const { id, thumbnails, title } = props

  return (
    <Card
      data-vedio-id={id}
      sx={{
        width: '300px',
      }}
    >
      <CardMedia
        component="img"
        height="150"
        width="300"
        image={thumbnails}
        alt="vedio"
      />
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
  )
}

export default VideoCard
