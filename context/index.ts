import { createContext } from 'react'
import { OffersData, Record } from '../typings'

interface IOfferDataContext {
  offers?: Record[],
  appliedFilters?: {
    [key: string]: string
  },
  filteredOffers?: Record[]
  toggleFilteredOffers?: (newOffers?: Record[]) => void
  updateAppliedFilters?: (newAppliedFilters?: {[key: string]: string} ) => void
}

export const OfferDataContext = createContext<IOfferDataContext>({})
