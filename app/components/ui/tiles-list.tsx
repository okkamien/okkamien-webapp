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

export const TilesList: FC<ITilesListProps> = ({button, cols = [1, 3], tiles, title}) => {
  return (
    <Box cs={{label: 'Tile-list', width: '100%'}}>
      {title && <Title cs={{mb: [theme.spacing.l, theme.spacing.xxl]}}>{title}</Title>}
      <Grid tag="ul" cols={cols} composition={['semanticList']} cs={{gap: [theme.spacing.ms, theme.spacing.ml, theme.spacing.l]}}>
        {tiles.map((tile, i) => (
          <Box key={i} tag="li">
            <Tile {...tile} />
          </Box>
        ))}
      </Grid>
      {button && (
        <Btn link={button.link} dark cs={{mt: [theme.spacing.l, theme.spacing.xxl]}}>
          {button.label}
        </Btn>
      )}
    </Box>
  )
}
