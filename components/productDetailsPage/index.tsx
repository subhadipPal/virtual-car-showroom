import { useContext } from "react"
import { OfferDataContext } from "../../context"
import { getVehicleDetails } from "../../utils"
import PDPGallery from "./atoms/ImageGallery"
import VehicleDetails from "./atoms/VehicleDetails"
import { makeStyles, createStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { AppContext } from "../../context/appContext"

interface IPDP {
  offerId: string
}

const useStyles = makeStyles<Theme>(
  (theme: Theme) =>
    createStyles({
      pdpContainer: {
        margin: 'auto 100px',
        display: 'flex',
        padding: '20px 0',
        flexDirection: 'column',
        justifyContent: 'center'
      },
      galleryContainer: {
        height: '500px',
        overflowY: 'scroll'
      }
    }),
)

const PDP = ({offerId}: IPDP) => {
  const { pdpContainer, galleryContainer } = useStyles()
  const { offers } = useContext(AppContext)
  const vehicleDetails = getVehicleDetails(offerId, offers)
  return (
    <div className={pdpContainer}>
      <div className={galleryContainer}>
        <PDPGallery imgSet={vehicleDetails?.images}/>
      </div>
      <VehicleDetails data={vehicleDetails}/>
    </div>
  )
}

export default PDP