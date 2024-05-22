import React from 'react'
import {Text} from '@effortless-ui'
import {GetServerSideProps, NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {PaginatedContent, TilesList} from '@/app/components/ui'
import {TApiEvent} from '@/app/features/api/types'
import {getDehydratedState, IGetApiResponseParams, IPageWithPayload} from '@/app/features/api/utils'
import {mapApiEventToTile} from '@/app/utils'

const Page: NextPage<IPageWithPayload<[TApiEvent, TApiEvent]>> = ({payloads: [upcomingPayload, pastPayload]}) => {
  return (
    <MasterPage subtitle="Wydarzenia">
      <Text tag="h1">Wydarzenia</Text>
      <Text tag="h2">Nadchodzące</Text>
      <PaginatedContent payload={upcomingPayload}>{(data) => <TilesList tiles={data.map(mapApiEventToTile)} />}</PaginatedContent>
      <Text tag="h2">Minione</Text>
      <PaginatedContent payload={pastPayload}>{(data) => <TilesList tiles={data.map(mapApiEventToTile)} />}</PaginatedContent>
    </MasterPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const today = new Date().toISOString()
  const payloads: IGetApiResponseParams<TApiEvent>[] = [
    {endpoint: 'events', filters: {from: [today, 'gte']}, populate: ['thumbnail'], sort: [['from']]},
    {endpoint: 'events', filters: {from: [today, 'lt']}, populate: ['thumbnail'], sort: [['from']]},
  ]
  const {dehydratedState} = await getDehydratedState({payloads, req})

  return {
    props: {dehydratedState, payloads},
  }
}

export default Page
