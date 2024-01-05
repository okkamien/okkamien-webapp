import React, {FC} from 'react'
import {Anchor, Box} from '@effortless-ui'
import Link from 'next/link'

import {Nav} from '@/app/components/layout'
import {siteMap} from '@/app/dictionaries/site.dictionary'
import {theme} from '@/app/styles'

export const Header: FC = () => (
  <Box tag="header" cs={{py: theme.spacing.base}}>
    <Link href={siteMap.homepage} legacyBehavior passHref>
      <Anchor>Miejsko-Gminny Ośrodek Kultury w Kamieniu Krajeńskim</Anchor>
    </Link>
    <Nav
      links={[
        {
          label: 'Aktualności',
          url: siteMap.news,
        },
        {
          label: 'Wydarzenia',
          url: siteMap.events,
        },
        {
          label: 'Działalność',
          url: siteMap.operations,
        },
        {
          label: 'Kontakt',
          url: siteMap.contact,
        },
      ]}
    />
  </Box>
)
