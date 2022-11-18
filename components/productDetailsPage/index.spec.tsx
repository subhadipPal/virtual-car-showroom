import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import PDP from './index'
// eslint-disable-next-line jest/no-mocks-import
import * as Offers from '../../__mocks__/mock-vehicle-data.json'
import { createTheme, Theme, ThemeProvider } from '@mui/material'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: (context: { displayName: string }) => {
    if (context.displayName === 'MyAppContext') {
      return {
        auth: {},
        lang: 'en',
        snackbar: () => {}
      }
    }

    const ActualReact = jest.requireActual('react')
    return {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      ...ActualReact.useContext(context),
      offers: Offers.records
    }
  }
}))

describe('Tests for PDP', () => {
  let wrapper: (arg0: string) => any
  const THEME = createTheme({})

  beforeAll(() => {
    wrapper = (offerId) => {
      return render(
        <ThemeProvider theme={THEME}>
          <PDP offerId={offerId} />
        </ThemeProvider>
      )
    }
  })

  afterAll(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const wrappedComponent = wrapper(
      'X1KC24HJ9F18TYLURRC22CY4TVKHN2T97FQNC6QHW7B2NFYVCY2U3MU4KT6NSQQCP1T9QC08F51'
    )
    // console.debug(wrappedComponent.debug())
    expect(wrappedComponent).toMatchSnapshot()
  })

  it('should be able to render pdp gallery', () => {
    const wrappedComponent = wrapper(
      'X1KC24HJ9F18TYLURRC22CY4TVKHN2T97FQNC6QHW7B2NFYVCY2U3MU4KT6NSQQCP1T9QC08F51'
    )

    const pdpGallery = screen.getByTestId('pdp-gallery')

    expect(pdpGallery).toBeDefined()
  })

  it('should be able to find the mileage for the car', () => {
    const wrappedComponent = wrapper(
      'X1KC24HJ9F18TYLURRC22CY4TVKHN2T97FQNC6QHW7B2NFYVCY2U3MU4KT6NSQQCP1T9QC08F51'
    )

    const pdpMileage = screen.getByTestId('pdp-mileage-info')

    expect(pdpMileage.textContent).toBe('Mileage: 59639')
  })
})
