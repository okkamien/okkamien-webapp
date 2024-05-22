import React, {FC, PropsWithChildren} from 'react'
import {Box} from '@effortless-ui'

import {Footer, Header} from '@/app/components/layout'
import {Container} from '@/app/components/ui'
import {theme} from '@/app/styles'

export const DefaultTemplate: FC<PropsWithChildren> = ({children}) => (
  <Box cs={{label: 'Layout-split', display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1}}>
    <Box cs={{label: 'Layout-header'}}>
      <Container>
        <Header />
      </Container>
    </Box>
    <Box
      cs={{
        label: 'Layout-main',
        display: 'flex',
        flexGrow: '1',
        py: [theme.spacing.xxxl, theme.spacing.xxxxl],
        borderStartStartRadius: theme.radii.l,
        borderStartEndRadius: theme.radii.l,
        bg: theme.gradient.linearLight,
      }}
    >
      <Container>{children}</Container>
    </Box>
    <Box cs={{label: 'Layout-footer', bg: theme.color.white}}>
      <Container>
        <Footer />
      </Container>
    </Box>
  </Box>
)
