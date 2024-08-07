import React, {FC, PropsWithChildren} from 'react'
import {Box} from '@effortless-ui'
import {Cover} from 'app/components/ui/cover'
import {CoverImage} from 'app/components/ui/cover-image'

import {Footer, Header} from '@/app/components/layout'
import {Breadcrumbs, Container, IBreadcrumbsProps} from '@/app/components/ui'
import {IApiImage, IApiSlide} from '@/app/features/api'
import {theme} from '@/app/styles'

interface IDefaultTemplate {
  breadcrumbs?: IBreadcrumbsProps
  coverData?: IApiSlide[]
  coverImage?: IApiImage
}

export const DefaultTemplate: FC<PropsWithChildren<IDefaultTemplate>> = ({breadcrumbs, coverData, children, coverImage}) => (
  <Box cs={{label: 'Layout-split', display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1}}>
    <Box cs={{label: 'Layout-header'}}>
      <Header />
      {coverData && <Cover coverData={coverData} />}
      {coverImage && <CoverImage image={coverImage.data.attributes.url} />}
    </Box>
    <Box
      cs={{
        label: 'Layout-main',
        position: 'relative',
        display: 'flex',
        flexGrow: 1,
        py: [theme.spacing.xxxl, theme.spacing.xxxxl],
        borderRadius: theme.radii.l,
        bg: theme.gradient.radialBackground,
        mt: theme.spacing.ms,
      }}
    >
      <Container>
        {breadcrumbs && (
          <Breadcrumbs
            {...breadcrumbs}
            cs={{
              position: 'absolute',
              top: -theme.spacing.xl,
              right: theme.gap,
              left: theme.gap,
              mt: -theme.spacing.s,
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
