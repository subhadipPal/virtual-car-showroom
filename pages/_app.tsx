import type { AppProps } from 'next/app'
import { useEffect, useMemo, useState } from 'react'
import { AppContext } from '../context/appContext'
import { Record as OfferRec } from '../typings'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../theme'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles)
    }
  }, [])
  const [appOffers, setAppOffers] = useState<OfferRec[]>()
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>()

  const toggleOffers = (offers?: OfferRec[]) => {
    setAppOffers(offers)
  }

  const toggleAppliedFilters = (newAppliedFilters?: Record<string, string>) => {
    setAppliedFilters(newAppliedFilters)
  }

  const appContextValue = useMemo(
    () => ({
      offers: appOffers,
      toggleOffers,
      appliedFilters,
      toggleAppliedFilters
    }),
    [appOffers, appliedFilters]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext.Provider value={appContextValue}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </ThemeProvider>
  )
}
