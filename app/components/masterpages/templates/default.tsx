import React, {FC, PropsWithChildren} from 'react'
import {Box} from '@effortless-ui'

import {Footer, Header} from '@/app/components/layout'
import {Container} from '@/app/components/ui'

export const DefaultTemplate: FC<PropsWithChildren> = ({children}) => (
  <Container cs={{display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1}}>
    <Header />
    <Box tag="main" cs={{flexGrow: 1}}>
      {children}
    </Box>
    <Footer />
  </Container>
)
