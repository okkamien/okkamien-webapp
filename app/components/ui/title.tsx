import React, {FC, PropsWithChildren} from 'react'
import {Box, PropsWithCS, Text} from '@effortless-ui'

import BrandSymbolIcon from '@/app/assets/brand-symbol.svg'
import {theme} from '@/app/styles'

interface ITitle extends PropsWithCS {
  breakOnMobile?: boolean
}

export const Title: FC<PropsWithChildren<ITitle>> = ({breakOnMobile = false, children, cs}) => {
  return (
    <Text
      tag="h2"
      variant="h1"
      cs={{
        label: 'Title',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        rowGap: theme.spacing.xxs,
        columnGap: theme.spacing.xs,
        ...(breakOnMobile && {
          flexDirection: ['column', 'row'],
        }),
        ...cs,
      }}
    >
      <Box cs={{display: 'flex', flexShring: '0', mx: 'auto'}}>
        <BrandSymbolIcon />
      </Box>
      <Text tag="span" cs={{flexGrow: '1'}}>
        {children}
      </Text>
    </Text>
  )
}
