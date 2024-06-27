import React, {FC, PropsWithChildren} from 'react'
import {Box, Grid, Text} from '@effortless-ui'

import {theme} from '@/app/styles'

interface ITwoColumnsProps {
  title: string
}

export const TwoColumns: FC<PropsWithChildren<ITwoColumnsProps>> = ({children, title}) => {
  return (
    <Grid cs={{label: 'Two-columns', position: 'relative', gap: theme.gap}} template={[['100%'], null, [408, 848]]}>
      <Box>
        <Text tag="h1" cs={{position: 'sticky', top: 0}}>
          {title}
        </Text>
      </Box>
      <Box cs={{display: 'flex', flexDirection: 'column', rowGap: theme.spacing.xxl}}>{children}</Box>
    </Grid>
  )
}
