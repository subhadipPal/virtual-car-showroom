import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    name: SupportedTheme
  }

  interface ThemeOptions {
    name?: SupportedTheme
  }
}

export enum SupportedTheme {
  Default,
}

const palette = {
  primary: { main: '#39A949', dark: '#1B5426' },
  secondary: { light: '#BFBFBF', main: '#979797', dark: '#707070' },
  error: { main: '#AE2E2E' },
  success: { main: '#39A949', dark: '#1B5426', light: '#F6FDF5' },
  text: { primary: '#323232', secondary: '#5B5B5B' }
}

const theme = createTheme({
  name: SupportedTheme.Default,
  palette,
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      'sans-serif',
    ].join(','),
    button: {
      textTransform: 'none',
    },
  },
})

theme.components = {
  ...theme.components,
  MuiTypography: {
    styleOverrides: {
      gutterBottom: {
        marginBottom: theme.spacing(3),
      },
      h2: {
        fontWeight: 400,
      },
      h3: {
        fontWeight: 500,
        fontSize: '1.75rem',
      },
      h4: {
        fontWeight: 700,
        fontSize: '1.25rem',
      },
      h5: {
        fontSize: '1rem',
        fontWeight: 700,
      },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        margin: '7px 0 24px 0',
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      '@global': {
        html: {
          touchAction: 'manipulation',
        },
        body: {
          backgroundColor: '#fff',
          fontSize: '0.875rem',
        },
        a: {
          color: 'rgb(22, 82, 151)',
        },
      },
    },
  },
} as typeof theme.components

export default theme
