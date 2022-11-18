import { useContext } from 'react'
import { getVehicleDetails } from '../../utils'
import PDPGallery from './atoms/ImageGallery'
import VehicleDetails from './atoms/VehicleDetails'
import { makeStyles, createStyles } from '@mui/styles'
import { Box, Theme } from '@mui/material'
import { AppContext } from '../../context/appContext'
import { Record as OfferRec } from '../../typings'

interface IPDP {
  offerId: string
  staticVehicleData: OfferRec[]
}

const useStyles = makeStyles<Theme>(() =>
  createStyles({
    pdpContainer: {
      margin: 'auto 100px',
      display: 'grid',
      padding: '20px 0',
      gridTemplateColumns: '700px 1fr',
      justifyContent: 'center'
    },
    galleryContainer: {
      height: '70vh',
      width: '700px',
      overflowY: 'scroll'
    }
  })
)

const PDP = ({ offerId, staticVehicleData }: IPDP) => {
  const { pdpContainer, galleryContainer } = useStyles()
  const { offers } = useContext(AppContext)
  const vehicleDetails = getVehicleDetails(
    offerId,
    offers ? offers : staticVehicleData
  )

  return (
    <div className={pdpContainer}>
      <div className={galleryContainer}>
        <PDPGallery imgSet={vehicleDetails?.images} />
      </div>
      <Box sx={{ marginLeft: '40px' }}>
        <VehicleDetails data={vehicleDetails} />
      </Box>
    </div>
  )
}

export default PDP
