import React, {FC} from 'react'
import {Box} from '@effortless-ui'

import {Nav} from '@/app/components/layout'
import {siteExternalLinks, siteFoundedYear} from '@/app/dictionaries/site.dictionary'
import {theme} from '@/app/styles'
import {getFormattedRange} from '@/app/utils'

export const Footer: FC = () => (
  <Box tag="footer" cs={{py: theme.spacing.base}}>
    Miejsko-Gminny Ośrodek Kultury w Kamieniu Krajeńskim app v.{process.env.NEXT_PUBLIC_APP_VERSION} &bull;{' '}
    {getFormattedRange(siteFoundedYear, new Date().getFullYear())}
    <Nav
      links={[
        {
          label: 'Facebook',
          url: siteExternalLinks.facebook,
        },
      ]}
    />
  </Box>
)
