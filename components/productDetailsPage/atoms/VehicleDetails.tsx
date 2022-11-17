import { Theme, Typography, useTheme } from "@mui/material"
import { makeStyles, createStyles } from '@mui/styles'

import { Record as OfferRec } from "../../../typings"
interface IVehicleDetails {
  data?: OfferRec
}

const useStyles = makeStyles<Theme>(
  (theme: Theme) =>
    createStyles({
      productDetailsContainer: {
        marginTop: '10px',
        display: 'grid',
        gap: '5px',
        gridTemplateColumns: '1fr 1fr 1fr 1fr'
      }
    }),
)
const VehicleDetails = ({ data: record }: IVehicleDetails) => {
  const theme = useTheme()
  const { productDetailsContainer } = useStyles()
  return record ? (
    <div >
      <div>
        <Typography variant="h4">
          {`${record.make} ${record.model}`}
        </Typography>
      </div>

      <div className={productDetailsContainer}>
        <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>
          {record.variant}
        </Typography>
        <Typography sx={{ fontSize: 10 }}>
          Condition: {record.condition}
        </Typography>
        <Typography sx={{ fontSize: 10 }}>
          Mileage: {record.mileage}
        </Typography>
        <Typography sx={{ fontSize: 10 }}>
          First registration: {record.firstRegistration}
        </Typography>
        <Typography sx={{ fontSize: 10 }}>
          Fuel: {record.fuel}
        </Typography>
        <Typography sx={{ fontSize: 10 }}>
          Power: {record.power}
        </Typography>
        <Typography sx={{ fontSize: 10 }}>
          Consumption: `${record.consumptionCombined} ${record.consumptionUnit}`
        </Typography>
        <Typography sx={{ fontSize: 10 }}>
          CO2: {record.co2}
        </Typography>
        <Typography variant='h6' sx={{ color: theme.palette.grey[700], width: '80%' }}>
          from €{record.monthlyInstallment}/month
        </Typography>
        <Typography variant='h6' sx={{ color: theme.palette.grey[700] }}>
          €{record.price}
        </Typography>
      </div>
    </div>
  ) : null
}

export default VehicleDetails