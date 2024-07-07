import React, {FC, PropsWithChildren} from 'react'
import {Box, Grid, Text} from '@effortless-ui'

import {SplitTitle} from '@/app/components/ui'
import {theme} from '@/app/styles'

interface ITwoColumnsProps {
  title: string | [string, string]
}

export const TwoColumns: FC<PropsWithChildren<ITwoColumnsProps>> = ({children, title}) => {
  return (
    <Grid cs={{label: 'Two-columns', position: 'relative', gap: theme.gap}} template={[['100%'], null, [406, 850]]}>
      <Box>
        <Text tag="h1" cs={{position: 'sticky', top: theme.spacing.s + theme.size.nav}}>
          <SplitTitle title={title} />
        </Text>
      </Box>
      <Box cs={{display: 'flex', flexDirection: 'column', rowGap: theme.spacing.xxl}}>{children}</Box>
    </Grid>
  )
}
