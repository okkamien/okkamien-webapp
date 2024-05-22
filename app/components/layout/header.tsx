import React, {FC} from 'react'
import {Anchor, Box} from '@effortless-ui'
import Link from 'next/link'

import {navigationLinks, navigationSocials, siteMap} from '@/app/dictionaries/site.dictionary'
import {theme} from '@/app/styles'

export const Header: FC = () => (
  <Box tag="header" cs={{py: theme.spacing.m}}>
    <Link href={siteMap.homepage} legacyBehavior passHref>
      <Anchor>Miejsko-Gminny Ośrodek Kultury w Kamieniu Krajeńskim</Anchor>
    </Link>
    <Box tag="ul" composition={['semanticList']} cs={{display: 'flex', columnGap: theme.spacing.s}}>
      {navigationSocials.map(({label, link}, i) => (
        <Box tag="li" key={i}>
          <Link href={link} legacyBehavior passHref>
            <Anchor>{label}</Anchor>
          </Link>
        </Box>
      ))}
    </Box>
    <Box tag="ul" composition={['semanticList']} cs={{display: 'flex', columnGap: theme.spacing.s}}>
      {navigationLinks.map(({label, link}, i) => (
        <Box tag="li" key={i}>
          <Link href={link} legacyBehavior passHref>
            <Anchor>{label}</Anchor>
          </Link>
        </Box>
      ))}
    </Box>
  </Box>
)
