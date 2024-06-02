import React, {FC} from 'react'
import {Anchor, Box} from '@effortless-ui'
import {LinksSection} from 'app/components/layout/componets/footer/LinksSections'
import {LogoSection} from 'app/components/layout/componets/footer/LogoSection'
import Link from 'next/link'

import {siteDomain, siteFoundedYear} from '@/app/dictionaries/site.dictionary'
import {theme} from '@/app/styles'
import {getFormattedRange} from '@/app/utils'

export const Footer: FC = () => (
  <Box tag="footer" cs={{py: theme.spacing.m}}>
    <LogoSection />
    <LinksSection />
    <Box cs={{pt: theme.spacing.ml, textAlign: 'center'}}>
      &copy; {getFormattedRange(siteFoundedYear, new Date().getFullYear())} |{' '}
      <Link href="/" legacyBehavior passHref>
        <Anchor>{siteDomain}</Anchor>
      </Link>
    </Box>
  </Box>
)
