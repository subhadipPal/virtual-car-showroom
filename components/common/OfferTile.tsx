import { Card, CardActionArea, CardContent, CardMedia, Theme, Typography } from '@mui/material'
import { Record } from '../../typings'

const OfferTile = ({ record }: { record: Record }) => {
  return (
      <Card sx={{ minWidth: 200 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={record.image}
            alt={`${record.make} ${record.variant}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
  )
}

export default OfferTile