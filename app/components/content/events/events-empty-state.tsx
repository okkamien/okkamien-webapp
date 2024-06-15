import React, {FC} from 'react'
import {Anchor, Box, Text} from '@effortless-ui'

import {Tile, TilesList} from '@/app/components/ui'
import {TApiEvent} from '@/app/features/api'
import {theme} from '@/app/styles'
import {mapApiEventToTile} from '@/app/utils'

interface IEventsEmptyStateProps {
  events: TApiEvent[]
}

export const EventsEmptyState: FC<IEventsEmptyStateProps> = ({events}) => {
  return (
    <>
      <Box cs={{display: 'flex', flexDirection: 'column', rowGap: theme.spacing.ms, mb: theme.spacing.l}}>
        <Text>Przepraszamy, obecnie nie prowadzimy żadnej aktywności, która odpowiada wybranym przez Ciebie filtrom.</Text>
        <Text cs={{pt: theme.spacing.ms, borderTop: '1px solid', borderTopColor: theme.color.border}}>
          Zachęcamy jednak do kontaktu z nami - chętnie dowiemy się czego poszukujesz!
        </Text>
        <Text>
          Zadzwoń: <strong>(0-52) 3 88 60 68</strong> lub napisz:{' '}
          <Anchor href="mailto:mgok.kamienkraj@wp.pl" cs={{color: theme.color.text, fontWeight: 700, textDecoration: 'none'}}>
            mgok.kamienkraj@wp.pl
          </Anchor>
          .
        </Text>
        <Text cs={{pt: theme.spacing.ms, borderTop: '1px solid', borderTopColor: theme.color.border}}>
          Zobacz również aktualnie promowane wydarzenia:
        </Text>
      </Box>
      <TilesList
        tiles={events.map((item, i) => (
          <Tile key={i} {...mapApiEventToTile(item)} />
        ))}
      />
    </>
  )
}
