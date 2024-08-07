import React, {FC, PropsWithChildren} from 'react'
import {Box} from '@effortless-ui'
import {IconMapPin, IconX} from '@tabler/icons-react'

import {theme} from '@/app/styles'

interface ITagProps {
  close?: boolean
  icon?: boolean
  inverse?: boolean
  onClick?(): void
}

export const tagHoverParent = 'tag-hover-parent'

export const Tag: FC<PropsWithChildren<ITagProps>> = ({children, close, icon = true, inverse, onClick}) => {
  return (
    <Box
      cs={{
        label: 'Tag',
        display: 'flex',
        alignItems: 'center',
        columnGap: theme.spacing.xxs,
        px: theme.spacing.xs,
        py: theme.spacing.xxs,
        color: inverse ? theme.color.primary : theme.color.white,
        fontSize: theme.font.size.small,
        textTransform: 'uppercase',
        bg: inverse ? theme.color.white : theme.color.text,
        borderRadius: theme.radii.s,
        transition: 'color 200ms, background-color 200ms',
        ...(close && {
          cursor: 'pointer',
        }),
        [`&:hover, .${tagHoverParent}:hover &`]: {
          color: theme.color.primary,
          bg: theme.color.white,
        },
      }}
      {...(onClick && {onClick})}
    >
      {icon && <IconMapPin size={12} />}
      {children}
      {close && <IconX size={14} />}
    </Box>
  )
}
