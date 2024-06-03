import React from 'react'
import {Text} from '@effortless-ui'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {PaginatedContent, Tile, TilesList} from '@/app/components/ui'
import {TApiEvent} from '@/app/features/api/types'
import {getDehydratedState, IGetApiCollectionResponseParams, IPageWithPayload} from '@/app/features/api/utils'
import {mapApiEventToTile} from '@/app/utils'

const Page: NextPage<IPageWithPayload<[TApiEvent, TApiEvent]>> = ({payloads: [upcomingPayload, pastPayload]}) => {
  return (
    <MasterPage breadcrumbs={{current: 'Wydarzenia'}}>
      <Text>Nadchodzące wydarzenia</Text>
      <PaginatedContent payload={upcomingPayload}>
        {(data) => (
          <TilesList
            tiles={data.map((item, i) => (
              <Tile key={i} {...mapApiEventToTile(item)} />
            ))}
          />
        )}
      </PaginatedContent>
      <Text>Minione wydarzenia</Text>
      <PaginatedContent payload={pastPayload}>
        {(data) => (
          <TilesList
            tiles={data.map((item, i) => (
              <Tile key={i} {...mapApiEventToTile(item)} />
            ))}
          />
        )}
      </PaginatedContent>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const today = new Date().toISOString()
  const payloads: IGetApiCollectionResponseParams<TApiEvent>[] = [
    {endpoint: 'events', filters: {from: [today, 'gte']}, populate: ['thumbnail'], sort: [['from']]},
    {endpoint: 'events', filters: {from: [today, 'lt']}, populate: ['thumbnail'], sort: [['from']]},
  ]
  const {dehydratedState} = await getDehydratedState({payloads})

  return {
    props: {dehydratedState, payloads},
  }
}

export default Page
