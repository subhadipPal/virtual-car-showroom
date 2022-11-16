import { useContext, useEffect, useState } from 'react'
import { OffersData, Record } from '../typings'
import { fetchVehicleData, getDefaultAppliedFilters } from '../utils'
import ProductListingPage from '../components/productListingPage'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../theme'
import { OfferDataContext } from '../context'

type AppliedFiltersType = {[key: string]: string} 

export default function Home({vehicleData}: {vehicleData: OffersData}) {
  const { getOffersV3Beta: { metadata, records: staticRecords}} = vehicleData

  const [vehicleOffers, setVehicleOffers] = useState(staticRecords)
  const [filteredVehicleOffers, setFilteredVehicleOffers] = useState<Record[]| undefined>()
  const [currentPage, setCurrentPage] = useState(metadata.page)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFiltersType | undefined>(getDefaultAppliedFilters())

  useEffect(() => {
    (async function fetcher() {
      if(currentPage > 0){
        try{
          const newVehicleData = await fetchVehicleData(currentPage)
          setVehicleOffers(newVehicleData.getOffersV3Beta.records)
        }
        catch(err) {
          setVehicleOffers(staticRecords)
        }
      }
    })()
  }, [currentPage, staticRecords, vehicleData])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OfferDataContext.Provider value={{
        offers: vehicleOffers,
        appliedFilters: appliedFilters,
        filteredOffers: filteredVehicleOffers,
        toggleFilteredOffers: (newOffers?: Record[]) => setFilteredVehicleOffers(newOffers),
        updateAppliedFilters: (newAppliedFilters?: AppliedFiltersType) => setAppliedFilters(newAppliedFilters)
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
