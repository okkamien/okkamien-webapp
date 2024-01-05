import React, {useState} from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import {effortlessThemeDefaultContextProps, EffortlessThemeProvider} from '@effortless-ui'
import {Global} from '@emotion/react'
import {AppProps} from 'next/app'

import {base, effortlessTheme, text} from '@/app/styles'

import '@/app/styles/vendors.scss'

const App = ({Component, pageProps}: AppProps) => {
  // eslint-disable-next-line react/hook-use-state
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <EffortlessThemeProvider theme={effortlessTheme} {...effortlessThemeDefaultContextProps}>
        <Global styles={[base, text]} />
        <Component {...pageProps} />
      </EffortlessThemeProvider>
    </QueryClientProvider>
  )
}

export default App
