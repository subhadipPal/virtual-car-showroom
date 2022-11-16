import { Record as OfferRec} from "../../../typings"

interface IVehicleDetails {
  data?: OfferRec
}
const VehicleDetails = ({data}: IVehicleDetails) => {
  return (
    <div>VehicleDetails</div>
  )
}

export default VehicleDetails