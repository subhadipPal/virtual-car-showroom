import { createContext } from 'react'
import { Record as OfferRec } from '../typings'

interface IAppContext {
  offers?: OfferRec[],
  appliedFilters?: Record<string, string>,
  toggleOffers?: (newOffers?: OfferRec[]) => void,
  toggleAppliedFilters?: (newAppliedFilters?: Record<string, string> ) => void
}

export const AppContext = createContext<IAppContext>({})