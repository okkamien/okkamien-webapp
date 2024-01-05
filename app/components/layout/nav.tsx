import React, {FC} from 'react'
import {Anchor, Box} from '@effortless-ui'
import Link from 'next/link'

import {theme} from '@/app/styles'

interface INavProps {
  links: {
    label: string
    url: string
  }[]
}

export const Nav: FC<INavProps> = ({links}) => (
  <Box tag="ul" composition={['semanticList']} cs={{label: 'Nav', display: 'flex', columnGap: theme.spacing.s}}>
    {links.map(({label, url}) => (
      <Box tag="li" key={url}>
        <Link href={url} legacyBehavior passHref>
          <Anchor {...(url.startsWith('http') && {target: '_blank'})}>{label}</Anchor>
        </Link>
      </Box>
    ))}
  </Box>
)
