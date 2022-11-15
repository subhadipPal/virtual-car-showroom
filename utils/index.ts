import _ from 'lodash'
import { VehicleData } from '../typings'

export const fetchVehicleData = _.memoize( async (page ?: number) => {
  const response: Response = await fetch('http://demo9481430.mockable.io/offers')
  const vehicleData: VehicleData = await response.json()

  return vehicleData.data
})