import { useCallback, useContext, useEffect, useState } from 'react'
import { OffersData, Record } from '../typings'
import { fetchVehicleData, getDefaultAppliedFilters } from '../utils'
import ProductListingPage from '../components/productListingPage'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../theme'
import { OfferDataContext } from '../context'
import { useRouter } from 'next/router'
import { AppContext } from '../context/appContext'

type AppliedFiltersType = {[key: string]: string} 

export default function Home({vehicleData}: {vehicleData: OffersData}) {
  const { getOffersV3Beta: { metadata, records: staticRecords}} = vehicleData

  const [vehicleOffers, setVehicleOffers] = useState(staticRecords)
  const [filteredVehicleOffers, setFilteredVehicleOffers] = useState<Record[]| undefined>()
  const { toggleOffers, toggleAppliedFilters, appliedFilters: appAppliedFilters } = useContext(AppContext)
  let areFiltersUpdated = false
  const [appliedFilters, setAppliedFilters] = useState<AppliedFiltersType | undefined>(getDefaultAppliedFilters())

  if(appAppliedFilters){
    areFiltersUpdated = Object.values(appAppliedFilters).some((filterVal) => !filterVal)
  }

  const router = useRouter()

  const handleOfferTileClick = useCallback((vehicleId: string) => {
    router.push(`/${vehicleId}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    toggleOffers?.(vehicleOffers)
    if(areFiltersUpdated){
      setAppliedFilters(appAppliedFilters)
    }
  }, [appAppliedFilters, appliedFilters, areFiltersUpdated, toggleOffers, vehicleOffers])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OfferDataContext.Provider value={{
        offers: vehicleOffers,
        appliedFilters: appliedFilters,
        filteredOffers: filteredVehicleOffers,
        redirectToPDP: handleOfferTileClick,
        toggleFilteredOffers: (newOffers?: Record[]) => setFilteredVehicleOffers(newOffers),
        updateAppliedFilters: (newAppliedFilters?: AppliedFiltersType) => {
          setAppliedFilters(newAppliedFilters)
          toggleAppliedFilters?.(newAppliedFilters)
        }
      }} >
      <ProductListingPage />
      </OfferDataContext.Provider>
    </ThemeProvider>
  )
}

export async function getStaticProps() {
  try{
    const vehicleData = await fetchVehicleData()
    if(!vehicleData){
      return {
        notFound: true,
      }
    }

    return {
      props: {
        vehicleData
      }
    }
  }
  catch(err) {
    console.error(err)
    return {
      notFound: true,
    }
  }
}
