import React, {FC} from 'react'
import {Anchor, Box, PropsWithCS} from '@effortless-ui'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

import {theme} from '@/app/styles'

interface BreadcrumbsLink {
  label: string
  link: string
}

interface IBreadcrumbsLinkProps extends BreadcrumbsLink {
  isActive?: boolean
}

export interface IBreadcrumbsProps extends PropsWithCS {
  links?: BreadcrumbsLink[]
  current: string
}

export const BreadcrumbsLink: FC<IBreadcrumbsLinkProps> = ({isActive, label, link}) => {
  return (
    <Box tag="li" cs={{'&:not(:first-of-type)::before': {content: '"/"', mx: theme.spacing.s, color: theme.color.inactive}}}>
      <Link href={link} legacyBehavior passHref>
        <Anchor
          cs={{
            color: isActive ? theme.color.overlay : theme.color.inactive,
            textDecoration: 'none',
            fontWeight: 300,
            whiteSpace: 'nowrap',
            '&:hover': {
              color: theme.color.primary,
            },
          }}
        >
          {label}
        </Anchor>
      </Link>
    </Box>
  )
}

export const Breadcrumbs: FC<IBreadcrumbsProps> = ({cs, current, links}) => {
  const pathname = usePathname()

  return (
    <Box
      tag="ul"
      composition={['semanticList']}
      cs={{
        label: 'Breadcrumbs',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        ...cs,
      }}
    >
      <BreadcrumbsLink label="Strona główna" link="/" />
      {links?.map((link, i) => <BreadcrumbsLink key={i} {...link} />)}
      {pathname && <BreadcrumbsLink isActive label={current} link={pathname} />}
    </Box>
  )
}
