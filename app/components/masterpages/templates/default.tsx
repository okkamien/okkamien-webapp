import React, {FC, PropsWithChildren} from 'react'
import {Box} from '@effortless-ui'

import {Footer, Header} from '@/app/components/layout'
import {Container} from '@/app/components/ui'
import {theme} from '@/app/styles'

export const DefaultTemplate: FC<PropsWithChildren> = ({children}) => (
  <Box cs={{label: 'Layout-split', display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1}}>
    <Container>
      <Header />
    </Container>
    <Container
      tag="main"
      cs={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexGrow: '1',
        rowGap: [theme.spacing.xxxl, theme.spacing.xxxxl],
        py: [theme.spacing.xxxl, theme.spacing.xxxxl],
        borderStartStartRadius: theme.radii.l,
        borderStartEndRadius: theme.radii.l,
        bg: theme.gradient.linearLight,
      }}
    >
      {children}
    </Container>
    <Container cs={{bg: theme.color.white}}>
      <Footer />
    </Container>
  </Box>
)
