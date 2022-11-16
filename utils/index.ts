import _ from 'lodash'
import { Record as OfferRec, VehicleData } from '../typings'

export const filters = [
  'make',
  'model',
  'mileage',
  'power',
  'firstRegistration',
  'fuel',
  'price',
  'gearbox',
  'exteriorColor',
  'category'
]

export const fetchVehicleData = _.memoize(async (page?: number) => {
  const response: Response = await fetch('http://demo9481430.mockable.io/offers')
  const vehicleData: VehicleData = await response.json()

  return vehicleData.data
})

export const getDefaultAppliedFilters = () => {
  const filterArr = filters.map((filter) => ([filter, '']))
  return Object.fromEntries(filterArr)
}

export const getRespectiveFilterValues = (filter: keyof OfferRec, records?: OfferRec[]) => {
  const filterValues = records?.map(item => ({
    [filter]: item[filter]
  })).filter(item => Object.keys(item)[0] === filter)
    .map(item => item[filter])
  const uniqueFilterValues = _.uniq(filterValues)

  return uniqueFilterValues as string[]
}

export const getFilteredRecords = (appliedFilters?: Record<string, string>, offers?: OfferRec[]) => {
  return appliedFilters ?
    offers?.filter(
      (offerItem) =>
        Object.keys(appliedFilters)
          .every(filterName =>
            (`${offerItem[filterName as keyof OfferRec]}`.toLowerCase()
            === `${appliedFilters[filterName]}`.toLowerCase() || !appliedFilters[filterName] )))
    : offers
}