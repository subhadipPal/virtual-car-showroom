import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import { AppContext } from '../context/appContext';
import { Record as OfferRec } from '../typings';
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../theme'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);
  const [appOffers, setAppOffers] = useState<OfferRec[]>()
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>()

  const toggleOffers = (offers?: OfferRec[]) => {
    setAppOffers(offers)
  }

  const toggleAppliedFilters = (appliedFilters?: Record<string, string>) => {
    setAppliedFilters(appliedFilters)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext.Provider value={{
        offers: appOffers,
        toggleOffers,
        appliedFilters,
        toggleAppliedFilters
      }}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </ThemeProvider>
  )
}