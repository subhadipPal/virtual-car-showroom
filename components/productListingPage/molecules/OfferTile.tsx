import { Box, Card, CardActionArea, CardContent, CardMedia, Theme, Typography, useTheme } from '@mui/material'
import { Record } from '../../../typings'
import { makeStyles, createStyles } from '@mui/styles'

const useStyles = makeStyles<Theme>(
  (theme: Theme) =>
    createStyles({
      tileContent: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%'
      },
      tileFooter: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '90%',
        minHeight: '40px',
        borderTop: `1px solid ${theme.palette.grey[400]}`
      }
    }),
)

const OfferTile = ({ record }: { record: Record }) => {
  const theme = useTheme()
  const { tileContent, tileFooter } = useStyles()
  return (
    <Card sx={{ width: '300px', height: '400px'}}>
      <CardActionArea className={tileContent}>
        <CardMedia
          component="img"
          image={record.image}
          alt={`${record.make} ${record.model}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {`${record.make} ${record.model}`}
          </Typography>
          <Typography sx={{ fontSize: 12 }}>
            {record.variant}
          </Typography>
          <Box sx={{ display: 'block' }}>
            <div className={tileFooter}>
              <Typography variant='h6' sx={{ color: theme.palette.grey[700], width: '80%' }}>
                from €{record.monthlyInstallment}/month
              </Typography>
              <Typography variant='h6' sx={{ color: theme.palette.grey[700] }}>
                €{record.price}
              </Typography>
            </div>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default OfferTile