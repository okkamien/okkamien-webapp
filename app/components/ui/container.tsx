import React, {ElementType, FC, PropsWithChildren} from 'react'
import {Box, CSObject} from '@effortless-ui'

import {theme} from '@/app/styles'

interface IContainerProps {
  cs?: CSObject
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
        ...(!fluid && {width: theme.size.container + theme.spacing.l * 2}),
        maxWidth: '100%',
        m: '0 auto',
        px: [theme.spacing.base, theme.spacing.l],
        ...cs,
      }}
    >
      {children}
    </Box>
  )
}
