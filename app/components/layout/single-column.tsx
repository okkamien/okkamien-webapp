import React, {FC, PropsWithChildren} from 'react'
import {Box, Text} from '@effortless-ui'

import {theme} from '@/app/styles'

interface ISingleColumnProps {
  title: string
}

export const SingleColumn: FC<PropsWithChildren<ISingleColumnProps>> = ({children, title}) => {
  return (
    <Box cs={{label: 'Single-column', width: '100%', maxWidth: 850, mx: 'auto'}}>
      <Text tag="h1" cs={{textAlign: 'center', mb: theme.spacing.xxl}}>
        {title}
      </Text>
      <Box cs={{display: 'flex', flexDirection: 'column', rowGap: theme.spacing.xxl}}>{children}</Box>
    </Box>
  )
}
