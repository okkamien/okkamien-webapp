import React, {FC, ReactNode} from 'react'
import {Box, Grid, GridCols} from '@effortless-ui'

import {theme} from '@/app/styles'

interface ITilesListProps {
  cols?: GridCols
  tiles: ReactNode[]
}

export const TilesList: FC<ITilesListProps> = ({cols = [1, 3], tiles}) => {
  return (
    <Grid tag="ul" cols={cols} composition={['semanticList']} cs={{gap: [theme.spacing.ms, theme.spacing.ml, theme.spacing.l]}}>
      {tiles.map((tile, i) => (
        <Box key={i} tag="li">
          {tile}
        </Box>
      ))}
    </Grid>
  )
}
