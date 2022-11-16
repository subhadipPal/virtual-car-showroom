import _ from 'lodash'
import { Record, VehicleData } from '../typings'

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

export const fetchVehicleData = _.memoize( async (page ?: number) => {
  const response: Response = await fetch('http://demo9481430.mockable.io/offers')
  const vehicleData: VehicleData = await response.json()

  return vehicleData.data
})

export const getDefaultAppliedFilters = () => {
  const filterArr = filters.map((filter) => ([filter, '']))
  return Object.fromEntries(filterArr)
}

export const getRespectiveFilterValues = (filter: keyof Record, records?: Record[]) => {
  const filterValues = records?.map(item => ({
    [filter]: item[filter]
  })).filter(item => Object.keys(item)[0] === filter)
  .map(item => item[filter])

  return filterValues as string[]
}

export const getFilteredRecords = (filterVal: string, filterKey: keyof Record, offers?: Record[]) => {
  return offers?.filter((offerItem) => offerItem[filterKey] === filterVal)
}