import React from 'react'
import { ServerStyleSheets } from '@mui/styles'
import Document, { Html, Main, NextScript, Head } from 'next/document'
import theme from '../theme'

export default class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body style={{ background: theme.palette.grey[300] }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage
  ctx.renderPage = () => {
    return originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    })
  }
  const initialProps = await Document.getInitialProps(ctx)
  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()
    ]
  }
}
