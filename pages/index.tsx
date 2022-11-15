import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { OffersData } from '../typings'
import { fetchVehicleData } from '../utils'
import ProductListingPage from '../components/productListingPage'

export default function Home({vehicleData}: {vehicleData: OffersData}) {
  const { getOffersV3Beta: { metadata}} = vehicleData

  const [vehicleOffers, setVehicleOffers] = useState(vehicleData)
  const [currentPage, setCurrentPage] = useState(metadata.page)

  useEffect(() => {
    (async function fetcher() {
      if(currentPage > 0){
        try{
          const newVehicleData = await fetchVehicleData(currentPage)
          setVehicleOffers(newVehicleData)
        }
        catch(err) {
          setVehicleOffers(vehicleData)
        }
      }
    })()
  }, [currentPage, vehicleData])

  return (
    <div className={styles.container}>
      <ProductListingPage records={vehicleOffers.getOffersV3Beta.records} />
    </div>
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
