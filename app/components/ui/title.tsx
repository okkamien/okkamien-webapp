import React, {FC, ForwardedRef, forwardRef, PropsWithChildren} from 'react'
import {Box, PropsWithCS, Text} from '@effortless-ui'

import BrandSymbolIcon from '@/app/assets/brand-symbol.svg'
import {theme} from '@/app/styles'

interface ITitleProps extends PropsWithCS {
  breakOnMobile?: boolean
  ref?: ForwardedRef<unknown>
}

export const Title: FC<PropsWithChildren<ITitleProps>> = forwardRef(({breakOnMobile = false, children, cs}, ref) => {
  return (
    <Text
      ref={ref}
      tag="h2"
      variant="h1"
      cs={{
        label: 'Title',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        rowGap: theme.spacing.xxs,
        columnGap: theme.spacing.xs,
        scrollMarginTop: theme.spacing.ml + theme.size.nav,
        ...(breakOnMobile && {
          flexDirection: ['column', 'row'],
        }),
        ...cs,
      }}
    >
      <Box cs={{display: 'flex', flexShring: 0, mx: 'auto', width: [18, 22]}}>
        <BrandSymbolIcon />
      </Box>
      <Text tag="span" cs={{flexGrow: 1}}>
        {children}
      </Text>
    </Text>
  )
})
