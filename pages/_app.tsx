import React, {useState} from 'react'
import {effortlessThemeDefaultContextProps, EffortlessThemeProvider} from '@effortless-ui'
import {Global} from '@emotion/react'
import {HydrationBoundary, keepPreviousData, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {AppProps} from 'next/app'

import {base, effortlessTheme, text} from '@/app/styles'

import '@/app/styles/vendors.scss'

const App = ({Component, pageProps}: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            placeholderData: keepPreviousData,
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <EffortlessThemeProvider theme={effortlessTheme} {...effortlessThemeDefaultContextProps}>
          <Global styles={[base, text]} />
          <Component {...pageProps} />
        </EffortlessThemeProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  )
}

export default App
