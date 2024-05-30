import React, {FC, ReactNode} from 'react'
import {Box, Grid, GridCols, PropsWithCS} from '@effortless-ui'

import {theme} from '@/app/styles'

interface ITilesListProps extends PropsWithCS {
  cols?: GridCols
  tiles: ReactNode[]
}

export const TilesList: FC<ITilesListProps> = ({cols = [1, 3], cs, tiles}) => {
  return (
    <Grid tag="ul" cols={cols} composition={['semanticList']} cs={{gap: theme.gap, ...cs}}>
      {tiles.map((tile, i) => (
        <Box key={i} tag="li">
          {tile}
        </Box>
      ))}
    </Grid>
  )
}
