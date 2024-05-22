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
          width: [
            theme.size.container + theme.spacing.ms * 2,
            theme.size.container + theme.spacing.ml * 2,
            theme.size.container + theme.spacing.l * 2,
          ],
        }),
        maxWidth: '100%',
        m: '0 auto',
        px: [theme.spacing.ms, theme.spacing.ml, theme.spacing.l],
        ...cs,
      }}
    >
      {children}
    </Box>
  )
}
