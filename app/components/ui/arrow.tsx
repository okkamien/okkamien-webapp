import React, {FC} from 'react'
import {Box, PropsWithCS} from '@effortless-ui'

import ArrowIcon from '@/app/assets/icons/arrow.svg'
import {theme} from '@/app/styles'

export const arrowHoverParent = 'arrow-hover-parent'

export const Arrow: FC<PropsWithCS> = ({cs}) => {
  return (
    <Box
      cs={{
        label: 'Arrow-icon',
        [`&:hover, .${arrowHoverParent}:hover &`]: {
          color: theme.color.primary,
        },
        transition: 'color 200ms',
        svg: {
          transform: 'rotate(0deg)',
          transition: 'transform 200ms',
          [`&:hover, .${arrowHoverParent}:hover &`]: {
            transform: 'rotate(-45deg)',
          },
        },
        ...cs,
      }}
    >
      <ArrowIcon />
    </Box>
  )
}
