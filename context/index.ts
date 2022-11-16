import { createContext } from 'react'
import { Record as OfferRec } from '../typings'

interface IOfferDataContext {
  offers?: OfferRec[],
  appliedFilters?: Record<string, string>,
  filteredOffers?: OfferRec[]
  toggleFilteredOffers?: (newOffers?: OfferRec[]) => void
  updateAppliedFilters?: (newAppliedFilters?: Record<string, string> ) => void
  redirectToPDP?:(vehicleId: string) => void 
}

export const OfferDataContext = createContext<IOfferDataContext>({})
