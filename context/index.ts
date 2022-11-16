import { createContext } from 'react'
import { Record as OfferRec } from '../typings'

interface IOfferDataContext {
  offers?: OfferRec[],
  appliedFilters?: Record<string, string>,
  filteredOffers?: OfferRec[]
  toggleFilteredOffers?: (newOffers?: OfferRec[]) => void
  updateAppliedFilters?: (newAppliedFilters?: {[key: string]: string} ) => void
}

export const OfferDataContext = createContext<IOfferDataContext>({})
