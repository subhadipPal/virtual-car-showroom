
import PDP from '../components/productDetailsPage'
import { useRouter } from 'next/router'

export default function PDPPage() {
  const router = useRouter()
  const { offerId } = router.query
  return (
    <PDP offerId={offerId as string}/>
  )
}