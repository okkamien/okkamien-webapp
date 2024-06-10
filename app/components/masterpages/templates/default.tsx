import React, {FC, PropsWithChildren} from 'react'
import {Box} from '@effortless-ui'

import {Footer, Header} from '@/app/components/layout'
import {Breadcrumbs, Container, IBreadcrumbsProps} from '@/app/components/ui'
import {theme} from '@/app/styles'

interface IDefaultTemplate {
  breadcrumbs?: IBreadcrumbsProps
}

export const DefaultTemplate: FC<PropsWithChildren<IDefaultTemplate>> = ({breadcrumbs, children}) => (
  <Box cs={{label: 'Layout-split', display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1}}>
    <Box cs={{label: 'Layout-header'}}>
      <Header />
    </Box>
    <Box
      cs={{
        label: 'Layout-main',
        position: 'relative',
        display: 'flex',
        flexGrow: '1',
        py: [theme.spacing.xxxl, theme.spacing.xxxxl],
        borderRadius: theme.radii.l,
        bg: theme.gradient.radialBackground,
      }}
    >
      <Container>
        {breadcrumbs && (
          <Breadcrumbs
            {...breadcrumbs}
            cs={{
              position: 'absolute',
              top: -theme.spacing.xxl,
              right: theme.gap,
              left: theme.gap,
            }}
          />
        )}
        {children}
      </Container>
    </Box>
    <Box cs={{label: 'Layout-footer', bg: theme.color.white, mt: -theme.spacing.ms, pt: theme.spacing.ms}}>
      <Container>
        <Footer />
      </Container>
    </Box>
  </Box>
)
