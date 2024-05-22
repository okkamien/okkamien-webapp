import React, {FC} from 'react'
import {Box, Grid, GridCols} from '@effortless-ui'

import {Btn, ITileProps, Tile, Title} from '@/app/components/ui'
import {theme} from '@/app/styles'

interface ITilesListProps {
  button?: {
    label: string
    link: string
  }
  cols?: GridCols
  tiles: ITileProps[]
  title?: string
}

export const TilesList: FC<ITilesListProps> = ({button, cols = [1, null, 3], tiles, title}) => {
  return (
    <>
      {title && <Title cs={{mb: theme.spacing.xxl}}>{title}</Title>}
      <Grid tag="ul" cols={cols} composition={['semanticList']} cs={{label: 'Tile-list', gap: theme.spacing.l}}>
        {tiles.map((tile, i) => (
          <Box key={i} tag="li">
            <Tile {...tile} />
          </Box>
        ))}
      </Grid>
      {button && (
        <Btn link={button.link} dark cs={{mt: theme.spacing.xxl}}>
          {button.label}
        </Btn>
      )}
    </>
  )
}
