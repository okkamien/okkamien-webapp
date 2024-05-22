import React, {FC} from 'react'
import {Anchor, Box} from '@effortless-ui'
import Link from 'next/link'

import {siteDomain, siteFoundedYear} from '@/app/dictionaries/site.dictionary'
import {theme} from '@/app/styles'
import {getFormattedRange} from '@/app/utils'

export const Footer: FC = () => (
  <Box tag="footer" cs={{py: theme.spacing.m}}>
    &copy; {getFormattedRange(siteFoundedYear, new Date().getFullYear())} |{' '}
    <Link href="/" legacyBehavior passHref>
      <Anchor>{siteDomain}</Anchor>
    </Link>{' '}
    v.{process.env.NEXT_PUBLIC_APP_VERSION}
  </Box>
)
