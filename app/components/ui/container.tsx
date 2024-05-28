import React, {ElementType, FC, PropsWithChildren} from 'react'
import {Box, PropsWithCS} from '@effortless-ui'

import {theme} from '@/app/styles'

interface IContainerProps extends PropsWithCS {
  fluid?: boolean
  tag?: ElementType
}

export const Container: FC<PropsWithChildren<IContainerProps>> = ({children, cs, fluid, tag}) => {
  return (
    <Box
      tag={tag}
      cs={{
        label: 'Container',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        ...(!fluid && {
          width: theme.gap.map((gap) => theme.size.container + gap * 2),
        }),
        maxWidth: '100%',
        m: '0 auto',
        px: theme.gap,
        ...cs,
      }}
    >
      {children}
    </Box>
  )
}
