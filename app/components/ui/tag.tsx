import React, {FC, PropsWithChildren} from 'react'
import {Box} from '@effortless-ui'

import PinIcon from '@/app/assets/icons/pin.svg'
import {theme} from '@/app/styles'

interface ITagProps {
  icon?: boolean
}

export const tagHoverParent = 'tag-hover-parent'

export const Tag: FC<PropsWithChildren<ITagProps>> = ({children, icon = true}) => {
  return (
    <Box
      cs={{
        label: 'Tag',
        display: 'flex',
        alignItems: 'center',
        columnGap: theme.spacing.xxs,
        px: theme.spacing.xs,
        py: theme.spacing.xxs,
        color: theme.color.white,
        fontSize: theme.font.size.small,
        textTransform: 'uppercase',
        bg: theme.color.text,
        borderRadius: theme.radii.s,
        transition: 'color 200ms, background-color 200ms',
        [`&:hover, .${tagHoverParent}:hover &`]: {
          color: theme.color.primary,
          bg: theme.color.white,
        },
      }}
    >
      {icon && <PinIcon />}
      {children}
    </Box>
  )
}
