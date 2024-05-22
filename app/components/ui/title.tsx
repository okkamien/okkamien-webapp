import React, {FC, PropsWithChildren} from 'react'
import {PropsWithCS, Text} from '@effortless-ui'

import BrandSymbolIcon from '@/app/assets/brand-symbol.svg'
import {theme} from '@/app/styles'

export const Title: FC<PropsWithChildren<PropsWithCS>> = ({children, cs}) => {
  return (
    <Text
      tag="h2"
      variant="h1"
      cs={{
        label: 'Title',
        display: 'flex',
        alignItems: 'center',
        columnGap: theme.spacing.xs,
        ...cs,
      }}
    >
      <BrandSymbolIcon />
      {children}
    </Text>
  )
}
