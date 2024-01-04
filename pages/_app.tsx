import React from 'react'
import {effortlessThemeDefaultContextProps, EffortlessThemeProvider} from '@effortless-ui'
import {Global} from '@emotion/react'
import {AppProps} from 'next/app'

import {base, effortlessTheme, text} from '@/app/styles'

import '@/app/styles/vendors.scss'

const App = ({Component, pageProps}: AppProps) => {
  return (
    <EffortlessThemeProvider theme={effortlessTheme} {...effortlessThemeDefaultContextProps}>
      <Global styles={[base, text]} />
      <Component {...pageProps} />
    </EffortlessThemeProvider>
  )
}

export default App
