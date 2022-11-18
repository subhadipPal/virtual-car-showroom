import { Theme, Typography, useTheme } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'

import { Record as OfferRec } from '../../../typings'
interface IVehicleDetails {
  data?: OfferRec
}

const useStyles = makeStyles<Theme>(() =>
  createStyles({
    productDetailsContainer: {
      marginTop: '10px',
      display: 'grid',
      gap: '20px',
      gridTemplateColumns: '1fr'
    }
  })
)
const VehicleDetails = ({ data: record }: IVehicleDetails) => {
  const theme = useTheme()
  const { productDetailsContainer } = useStyles()
  return record ? (
    <div>
      <div>
        <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>
          {`${record.make} ${record.model}`}
        </Typography>
      </div>

      <div className={productDetailsContainer}>
        <Typography sx={{ fontSize: 30, fontWeight: 'bold' }}>
          {record.variant}
        </Typography>
        <Typography sx={{ fontSize: 20 }}>
          Condition: {record.condition}
        </Typography>
        <Typography sx={{ fontSize: 20 }}>Mileage: {record.mileage}</Typography>
        <Typography sx={{ fontSize: 20 }}>
          First registration: {record.firstRegistration}
        </Typography>
        <Typography sx={{ fontSize: 20 }}>Fuel: {record.fuel}</Typography>
        <Typography sx={{ fontSize: 20 }}>Power: {record.power}</Typography>
        <Typography sx={{ fontSize: 20 }}>
          Consumption: `${record.consumptionCombined} ${record.consumptionUnit}`
        </Typography>
        <Typography sx={{ fontSize: 20 }}>CO2: {record.co2}</Typography>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.grey[700], width: '80%' }}
        >
          from €{record.monthlyInstallment}/month
        </Typography>
        <Typography variant="h6" sx={{ color: theme.palette.grey[700] }}>
          €{record.price}
        </Typography>
      </div>
    </div>
  ) : null
}

export default VehicleDetails
